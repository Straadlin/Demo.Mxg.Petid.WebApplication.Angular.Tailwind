import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, CanActivateChild } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { JwtPayload } from '../../shared/interfaces/jwt-payload.interface';

@Injectable({
  providedIn: 'root',
})
export class PermissionGuard implements CanActivate, CanActivateChild {

  private jwtHelper = new JwtHelperService();

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.checkPermission(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): boolean {
    return this.checkPermission(route);
  }

  private checkPermission(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.log('forbidden');
      this.router.navigate(['/warnings/access-denied']);
      return false;
    }

    // if (!token || this.jwtHelper.isTokenExpired(token)) {
    //   console.log('login');
    //   this.router.navigate(['/login']);
    //   return false;
    // }

    const decoded = this.jwtHelper.decodeToken(token);

    if (!this.isJwtPayload(decoded)) {
      throw new Error('Invalid JWT payload');
    }

    const tokenPayload = this.jwtHelper.decodeToken(token) as JwtPayload;
    const requiredPermission = route.data['permission'] as string;
    const userPermissions: string[] = tokenPayload.prm || [];

    if (!userPermissions.includes(requiredPermission)) {
      this.router.navigate(['/warnings/access-denied']);
      return false;
    }

    return true;
  }

  private isJwtPayload(obj: any): obj is JwtPayload {
    return typeof obj === 'object' && 'prm' in obj && Array.isArray(obj.prm);
  }

}
