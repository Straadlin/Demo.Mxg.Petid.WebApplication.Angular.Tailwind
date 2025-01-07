import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('../pet-search-by/pet-search-by.component')
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('../pet-detail/pet-detail.component')
  },
];
