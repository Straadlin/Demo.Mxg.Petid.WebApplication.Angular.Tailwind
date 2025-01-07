import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../cart-list/cart-list.component'),
  },
  {
    path: 'cart',
    loadComponent: () => import('../cart-list/cart-list.component'),
  },
];
