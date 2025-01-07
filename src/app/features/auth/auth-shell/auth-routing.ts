import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'signin',
    loadComponent: () => import('../sign-in/sign-in.component'),
  },
  {
    path: 'signup',
    loadComponent: () => import('../sign-up/sign-up.component'),
  },
  {
    path: 'resetpassword',
    loadComponent: () => import('../reset-password/reset-password.component'),
  },
];
