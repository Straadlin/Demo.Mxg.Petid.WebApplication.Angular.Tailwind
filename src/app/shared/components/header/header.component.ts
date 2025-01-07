import { AuthStateService } from '../../../core/data-access/auth-state.service';
import { CartStateService } from '../../../features/cart/shared/cart-state.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ROUTINGS } from '../../../shared/constants';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslateModule],
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  private authStateService = inject(AuthStateService);
  private router = inject(Router);
  public cartState = inject(CartStateService).state;
  public user$ = this.authStateService.user$;

  public goToMyAccount(): void {
    console.log('HeaderComponent.goToMyAccount');
    this.router.navigate([ROUTINGS.MY_ACCOUNT.MY_ACCOUNT]);
  }

  public signUp(): void {
    console.log('HeaderComponent.signUp');
    this.router.navigate([ROUTINGS.AUTH.SIGN_IN]);
  }

  public logout(): void {
    console.log('HeaderComponent.logout');
    this.authStateService.logout();
    this.router.navigate([ROUTINGS.AUTH.SIGN_IN]);
  }
}
