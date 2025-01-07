import { Component, inject } from '@angular/core';
import { LanguageStateService } from '../../../core/services/language-state.service';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.component.html',
    styles: [`
    button.active {
      font-weight: bold;
      color: #2563eb;
    }
    button:hover {
      color: #1d4ed8;
    }
  `]
})
export class FooterComponent {
  private languageStateService = inject(LanguageStateService);
  public currentLanguage = this.languageStateService.currentLanguage;

  changeLanguage(language: string) {
    console.log('FooterComponent.changeLanguage');
    this.languageStateService.changeLanguage(language);
  }
}
