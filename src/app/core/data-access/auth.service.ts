import { API_ENDPOINTS, LOCAL_STORAGE } from '../../shared/constants';
import { AuthSignInResponseDto } from '../../shared/interfaces/dtos/auth/sign-in/auth-signin-response-dto.interface';
import { AuthSignInRequestDto } from '../../shared/interfaces/dtos/auth/sign-in/auth-signin-request-dto.interface';
import { AuthSignUpRequestDto } from '../../shared/interfaces/dtos/auth/sign-up/auth-signup-request-dto.interface';
import { AuthSignUpResponseDto } from '../../shared/interfaces/dtos/auth/sign-up/auth-signup-response-dto.interface';
import { AuthRefreshTokenRequestDto } from '../../shared/interfaces/dtos/auth/refresh-token/auth-refresh-token-request-dto.interface';
import { AuthRefreshTokenResponseDto } from '../../shared/interfaces/dtos/auth/refresh-token/auth-refresh-token-response-dto.interface';
import { BaseHttpService } from '../../shared/data-access/base-http.service';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, timeout } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseHttpService {

  private jwtHelper = new JwtHelperService();

  public signUp(email: string, password: string, firstName: string, lastname: string)
    : Observable<AuthSignUpResponseDto> {
      console.log('AuthService.signUp');
      const body: AuthSignUpRequestDto = {
        firstName: firstName,
        lastName: lastname,
        email: email,
        password: password,
        genderTypeId: null,
        cityId: null,
      };

      const url: string = this.apiUrl + API_ENDPOINTS.ACCOUNTS.SIGN_UP;
      console.log({ url: url, body: body });
      return this.http
        .post<AuthSignUpResponseDto>(url, body)
        .pipe(timeout(this.timeout));
  }

  public signIn(username: string, password: string)
    : Observable<AuthSignInResponseDto> {
      console.log('AuthService.signIn');
      const body: AuthSignInRequestDto = {
        username: null,
        email: username,
        phoneNumber: null,
        password: password,
      };

      const url: string = this.apiUrl + API_ENDPOINTS.ACCOUNTS.SIGN_IN;
      console.log({ url: url, body: body });
      return this.http
        .post<AuthSignInResponseDto>(url, body)
        .pipe(timeout(this.timeout)); // This is a promise.
  }

  public refreshToken(accessToken: string, refreshToken: string)
    : Observable<AuthRefreshTokenResponseDto> {
      console.log('AuthService.refreshToken');
      const body: AuthRefreshTokenRequestDto = {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

      const url: string = this.apiUrl + API_ENDPOINTS.ACCOUNTS.REFRESH_TOKEN;
      console.log({ url: url, body: body });
      return this.http
        .post<AuthRefreshTokenResponseDto>(url, body)
        .pipe(timeout(this.timeout)); // This is a promise.
  }

  public isTokenExpired(): boolean {
    console.log('AuthService.isTokenExpired');
    const token = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);

    if (!token) {
      return true;
    }

    return !!this.jwtHelper.isTokenExpired(token)
  }

}
