import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':id',
    loadComponent: () => import('../product-detail/product-detail.component'),
  },
  {
    path: '',
    loadComponent: () => import('../product-list/product-list.component'),
  },
];
