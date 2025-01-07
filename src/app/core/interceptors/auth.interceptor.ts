import { API_ENDPOINTS, LOCAL_STORAGE } from '../../shared/constants';
import { AuthService } from '../data-access/auth.service';
import { catchError, switchMap, throwError, BehaviorSubject, filter, take } from 'rxjs';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../shared/data-access/storage.service';

let refreshInProgress = false; // Variable para saber si se está actualizando el token
const refreshTokenSubject = new BehaviorSubject<string | null>(null); // Notifica a todas las solicitudes sobre el nuevo token

const excludedUrls = [
  API_ENDPOINTS.ACCOUNTS.SIGN_IN,
  API_ENDPOINTS.ACCOUNTS.SIGN_UP,
  API_ENDPOINTS.ACCOUNTS.REFRESH_TOKEN,
  //'/auth/signin',
  //'/auth/signup',
  //'/auth/resetpassword',
  //'/accounts/signin',
  //'/accounts/signup',
  //'/accounts/refreshtoken',
  //'/accounts/resetpassword',
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const storageService = inject(StorageService);
  const routerService = inject(Router);

  const accessToken = storageService.getData(LOCAL_STORAGE.ACCESS_TOKEN) || '';
  const refreshToken = storageService.getData(LOCAL_STORAGE.REFRESH_TOKEN) || '';

  // **Paso 1: Excluir URLs que no requieren autenticación**
  if (excludedUrls.some(url => req.url.includes(url))) {
    console.log(`Interceptor: Saltando autenticación para la URL: ${req.url}`);
    return next(req);
  }

  if (!accessToken) {
    console.log('Token is null.');
    return next(req);
  }

  // **Paso 2: Verificar si el token está cerca de expirar antes de hacer la solicitud**
  if (isTokenExpired(accessToken)) {
    console.warn('El token está a punto de expirar. Intentando refrescar...');

    if (!refreshInProgress) {
      refreshInProgress = true;
      refreshTokenSubject.next(null);

      return authService.refreshToken(accessToken, refreshToken)
        .pipe(
          switchMap((res) => {
            console.log('Token actualizado exitosamente');
            const newAccessToken = res.data.accessToken;

            storageService.saveData(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);
            storageService.saveData(LOCAL_STORAGE.REFRESH_TOKEN, res.data.refreshToken);

            refreshInProgress = false;
            refreshTokenSubject.next(newAccessToken); // Notificar a todas las solicitudes en espera

            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });

            console.log('Retrying original request.');
            return next(newReq); // Reintentar la solicitud original
          }),
          catchError((refreshErr) => {
            console.error('Error refrescando el token. Cleaning storage.', refreshErr);
            refreshInProgress = false;

            storageService.removeData(LOCAL_STORAGE.ACCESS_TOKEN);
            storageService.removeData(LOCAL_STORAGE.REFRESH_TOKEN);

            refreshTokenSubject.next(null); // Notificar a todas las solicitudes en espera de que falló
            routerService.navigate([API_ENDPOINTS.ACCOUNTS.SIGN_IN]);
            return throwError(() => new Error('No se pudo refrescar el token. Inicia sesión de nuevo. (a)'));
          }
        )
      );
    } else {
      console.warn('Ya se está refrescando el token. Esperando...');

      // Esperar a que la solicitud de refresco termine
      return refreshTokenSubject
        .pipe(
          filter((token) => token !== null), // Esperar hasta que el token no sea null
          take(1), // Tomar el primer valor emitido
          switchMap((newAccessToken) => {
            const newReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newAccessToken}`
              }
            });
            console.warn('Next request.');
            return next(newReq);
          }
        )
      );
    }
  }

  // **Paso 3: Clonar la solicitud con el token actualizado**
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  // **Paso 4: Procesar la solicitud**
  return next(authReq)
    .pipe(
      catchError((err) => {
        if (err.status !== 401) {
          return throwError(() => err);
        }

        if (!refreshInProgress) {
          refreshInProgress = true;
          refreshTokenSubject.next(null);

          return authService.refreshToken(accessToken, refreshToken)
            .pipe(
              switchMap((res) => {
                const newAccessToken = res.data.accessToken;

                storageService.saveData(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);
                storageService.saveData(LOCAL_STORAGE.REFRESH_TOKEN, res.data.refreshToken);

                refreshInProgress = false;
                refreshTokenSubject.next(newAccessToken);

                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                return next(newReq);
              }),
              catchError((refreshErr) => {
                console.error({'refreshErr': refreshErr});
                refreshInProgress = false;
                storageService.removeData(LOCAL_STORAGE.ACCESS_TOKEN);
                storageService.removeData(LOCAL_STORAGE.REFRESH_TOKEN);
                routerService.navigate([API_ENDPOINTS.ACCOUNTS.SIGN_IN]);
                return throwError(() => new Error('Error al refrescar el token. (b)'));
              })
            );
        } else {
          return refreshTokenSubject
            .pipe(
              filter((token) => token !== null),
              take(1),
              switchMap((newAccessToken) => {
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`
                  }
                });
                return next(newReq);
              })
            );
        }
      }
    )
  );
};

// Helper para decodificar el JWT
function parseJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) =>
      '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error al decodificar el token JWT:', error);
    return null;
  }
}

// Verifica si el token ha expirado
function isTokenExpired(token: string): boolean {
  if (!token) {
    console.log('Token is null.');
    return true;
  }
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;
  const now = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
  const timeRemaining = payload.exp - now; // Tiempo restante para la expiración
  return timeRemaining < 60; // Refresca si faltan menos de 60 segundos
}
