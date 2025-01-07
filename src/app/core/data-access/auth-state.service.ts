/*
Este servicio gestionará el estado de autenticación del
usuario y sus permisos.
*/

import { LOCAL_STORAGE } from '../../shared/constants';
import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../shared/data-access/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {

  private storageService = inject(StorageService);
  public user = signal<{
    isAuthenticated: boolean;
    role: string | null;
    permissions: string[];
  }>({ isAuthenticated: false, role: null, permissions: [] });
  public user$ = computed(() => this.user());

  constructor() {
    console.log('AuthStateService.constructor');
    this.loadAuthState();
  }
  private updateUserState(token: string | null): void {
    console.log('AuthStateService.updateUserState');
    if (token) {
      const payload = this.decodeToken(token);
      this.user.set({
        isAuthenticated: true,
        role: payload?.role || null,
        permissions: payload?.prm || []
      });
    } else {
      this.user.set({
        isAuthenticated: false,
        role: null,
        permissions: []
      });
    }
  }

  private loadAuthState(): void {
    console.log('AuthStateService.loadAuthState');
    const token = this.storageService.getData(LOCAL_STORAGE.ACCESS_TOKEN);
    this.updateUserState(token);
  }

  public logout(): void {
    console.log('AuthStateService.logout');
    this.storageService.removeData(LOCAL_STORAGE.ACCESS_TOKEN);
    this.storageService.removeData(LOCAL_STORAGE.REFRESH_TOKEN);
    this.updateUserState(null);
  }

  public signIn(accessToken: string, refreshToken: string): void {
    console.log('AuthStateService.signIn');
    this.storageService.saveData(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    this.storageService.saveData(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    this.updateUserState(accessToken);
  }

  private decodeToken(token: string): any {
    try {
      console.log('AuthStateService.decodeToken');
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = atob(base64);
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }

  public hasPermission(permission: string): boolean {
    console.log('AuthStateService.hasPermission');
    return this.user().permissions.includes(permission);
  }

  public updateAuthState(token: string): void {
    console.log('AuthStateService.updateAuthState');
    this.storageService.saveData(LOCAL_STORAGE.ACCESS_TOKEN, token);
    this.updateUserState(token);
  }

  public hasValidToken(): boolean {
    console.log('AuthStateService.hasValidToken');
    const token = this.storageService.getData(LOCAL_STORAGE.ACCESS_TOKEN);
    if (!token) return false;
    const payload = this.decodeToken(token);
    return payload && payload.exp > Date.now() / 1000;
  }
}
