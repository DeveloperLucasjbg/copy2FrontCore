import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { countryIsoLanguages, CountryLanguages, CountryLanguageValueDefault, flagSelectionValueDefault } from '@shared/constants';
import { BehaviorSubject, shareReplay, Subject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  public static LANG = 'lang';
  private readonly DEFAULT_COUNTRY = 'BR';
  private readonly DEFAULT_LANG = 'pt-BR';

  private translateService = inject(TranslateService);

  private langSubscription?: Subscription;
  public static currentLang: string | null = null;

  private subjectLang = new Subject<string>();
  public observableLang = this.subjectLang.asObservable().pipe(shareReplay(1));

  private subjectCountry = new BehaviorSubject<string>(I18nService.currentLang || '');
  public observableCountry = this.subjectCountry.asObservable().pipe(shareReplay(1));

  initI18n(): void {
    this.addLangs();

    // const lang = I18nService.getLang;
    // const browserLanguage = this.getBrowserLanguage();

    // let finalLang = lang;

    // if (!finalLang || !countryIsoKeys.includes(finalLang)) {
    //   finalLang = this.detectFromBrowser(browserLanguage) || this.DEFAULT_COUNTRY;
    // }

    // this.translateService.setDefaultLang(countryIsoLanguages[finalLang]);
    // this.setLang(finalLang, true);

    this.translateService.setDefaultLang(countryIsoLanguages[this.DEFAULT_COUNTRY]); // TODO Cuando esten activos los demas paises borrar esta liniea y descomentar lo anterior
    this.setLang(this.DEFAULT_COUNTRY, true); // TODO Cuando esten activos los demas paises borrar esta liniea y descomentar lo anterior
  }

  private addLangs() {
    this.translateService.addLangs(['es', 'pt', 'en']);
  }

  private detectFromBrowser(browserLang: string): string | null {
    if (browserLang.startsWith('es')) {
      if (browserLang.endsWith('CL')) return 'CL';
      if (browserLang.endsWith('MX')) return 'MX';
      if (browserLang.endsWith('PE')) return 'PE';
      if (browserLang.endsWith('US')) return 'US';
      return 'CL';
    } else if (browserLang.startsWith('pt')) {
      return 'BR';
    }
    return null;
  }

  getBrowserLanguage(): string {
    return navigator.language || this.DEFAULT_LANG;
  }

  /**
   * Suscribirse a los cambios de idioma en el token.
   */
  onLanguageChange() {
    this.langSubscription = this.observableLang
      .subscribe((lang: string) => {
        this.translateService.use(lang);
        document.documentElement.lang = lang;
      });
  }

  /**
   * Eliminar la suscripción a los cambios de idioma.
   */
  unsubscribeLangChange(): void {
    this.langSubscription?.unsubscribe();
    this.langSubscription = undefined;
  }

  public setLang(lang: string, setForcedLang: boolean = false): void {
    localStorage.setItem(I18nService.LANG, lang);
    I18nService.currentLang = lang;

    this.subjectCountry.next(lang);

    if (setForcedLang) {
      if (lang == 'BR') {
        this.subjectLang.next('pt');
      } else {
        this.subjectLang.next('es');
      }
    } else {
      this.subjectLang.next(countryIsoLanguages[lang]);
    }
  }

  public static get getLang(): string {
    const lang = localStorage.getItem(I18nService.LANG);
    this.currentLang = this.currentLang || lang;
    return this.currentLang || flagSelectionValueDefault;
  }

  public static get getCurrentLanguage(): CountryLanguages {
    return (
      countryIsoLanguages[this.getLang] ||
      CountryLanguageValueDefault
    ) as CountryLanguages;
  }
}
