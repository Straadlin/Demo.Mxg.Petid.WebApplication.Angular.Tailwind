import { LOCAL_STORAGE, GENERAL } from '../../shared/constants'
import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../../shared/data-access/storage.service';

@Injectable({
  providedIn: 'root'
})
export class LanguageStateService {

  private storageService = inject(StorageService);
  private translateService = inject(TranslateService);

  public currentLanguage = signal<string>(GENERAL.DEFAULT_LANGUAGE); // Idioma predeterminado

  constructor() {
    this.loadLanguage();
  }

  private loadLanguage(): void {
    const savedLanguage = this.storageService.getData(LOCAL_STORAGE.LANGUAGE) || GENERAL.DEFAULT_LANGUAGE;
    this.currentLanguage.set(savedLanguage);
    this.translateService.use(savedLanguage);
  }

  changeLanguage(language: string): void {
    this.currentLanguage.set(language);
    this.translateService.use(language);
    this.storageService.saveData(LOCAL_STORAGE.LANGUAGE, language);
  }
}
