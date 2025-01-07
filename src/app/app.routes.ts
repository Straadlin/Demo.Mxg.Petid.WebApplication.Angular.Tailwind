import { ROUTINGS, PERMISSIONS } from './shared/constants';
import { Routes } from '@angular/router';
import { PermissionGuard } from './core/guards/permission.guard';
import { routes as authRoutes } from './features/auth/auth-shell/auth-routing';
import { routes as cartRoutes } from './features/cart/cart-shell/cart-routing';
import { routes as contactRoutes } from './features/contact/contact-shell/contact-routing';
import { routes as faqRoutes } from './features/faq/faq-shell/faq-routing';
import { routes as homeRoutes } from './features/home/home-shell/home-routing';
import { routes as petRoutes } from './features/pets/pet-shell/pets-routing';
import { routes as productRoutes } from './features/products/product-shell/products-routing';
import { routes as accountRoutes } from './features/my-account/my-account-shell/my-account-routing';
import { routes as warningsRoutes } from './features/warnings/warnings-shell/warnings-routing';
import { routes as managementRoutes } from './features/management/management-shell/management-routing';

export const routes: Routes = [
  {
    path: ROUTINGS.AUTH.AUTH,
    children: authRoutes,
  },
  {
    path: ROUTINGS.CART.CART,
    children: cartRoutes,
  },
  {
    path: ROUTINGS.CONTACT.CONTACT,
    children: contactRoutes,
  },
  {
    path: ROUTINGS.FAQ.FAQ,
    children: faqRoutes,
  },
  {
    path: ROUTINGS.HOME.HOME,
    children: homeRoutes,
  },
  {
    path: ROUTINGS.PET.PET,
    children: petRoutes,
  },
  {
    path: ROUTINGS.PRODUCT.PRODUCT,
    children: productRoutes,
  },
  {
    path: ROUTINGS.MY_ACCOUNT.MY_ACCOUNT,
    children: accountRoutes,
    canActivateChild: [PermissionGuard],
    data: { permission: PERMISSIONS.CAN_VIEW_MY_ACCOUNT }
  },
  {
    path: ROUTINGS.MANAGEMENT.MANAGEMENT,
    children: managementRoutes,
    canActivateChild: [PermissionGuard],
    data: { permission: PERMISSIONS.CAN_VIEW_MANAGEMENT }
  },
  {
    path: ROUTINGS.WARNINGS.WARNINGS,
    children: warningsRoutes,
  },
  {
    path: '',
    redirectTo: ROUTINGS.HOME.HOME,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: ROUTINGS.WARNINGS.WARNINGS,
  },
];
