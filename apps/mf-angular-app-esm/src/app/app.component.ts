import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TokenService } from '@services';
import { I18nService } from '@services/generic/i18n.service';

@Component({
  selector: 'mfapp-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  private i18nService = inject(I18nService);
  private tokenService = inject(TokenService);

  constructor() {
    this.i18nService.onLanguageChange();
    this.i18nService.initI18n();
  }
  

  ngOnInit(): void {
    this.checkReload()
    // this.initDatadogRum();
  }

  // private initDatadogRum() {
  //   if (environment.envName !== 'dev') {
  //     datadogRum.init(environment.datadogRum as RumInitConfiguration);
  //   }
  // }

  private async checkReload() {
    await this.tokenService.checkReloadPage();
  }
}
