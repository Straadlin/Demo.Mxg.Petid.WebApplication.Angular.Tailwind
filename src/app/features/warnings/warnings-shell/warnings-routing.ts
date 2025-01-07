import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'access-denied',
    loadComponent: () => import('../access-denied/access-denied.component'),
  },
  {
    path: 'not-found',
    loadComponent: () => import('../not-found/not-found.component'),
  },
  {
    path: 'maintenance',
    loadComponent: () => import('../maintenance/maintenance.component'),
  },
  {
    path: '',
    loadComponent: () => import('../not-found/not-found.component'),
  },
  {
    path: '**',
    loadComponent: () => import('../not-found/not-found.component'),
  },
];
