import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from "./app.routes";
import { HttpClientModule, provideHttpClient, withInterceptors } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { provideTranslation } from "@core/i18n/translate.providers";
import { graphqlProvider } from "./graphql.provider";
import { RECAPTCHA_SETTINGS, RECAPTCHA_V3_SITE_KEY, RecaptchaSettings } from "ng-recaptcha-2";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([
        //TODO: Agregar interceptors
        // spinnerInterceptor,
        // tokenInterceptor,
        // responseInterceptor,
        // renewTokenInterceptor,
        // validateApplicationInterceptor,
      ])
    ),
    provideAnimations(),
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey2,
      } as RecaptchaSettings,
    },
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(provideTranslation()),
    graphqlProvider,
  ],
};
