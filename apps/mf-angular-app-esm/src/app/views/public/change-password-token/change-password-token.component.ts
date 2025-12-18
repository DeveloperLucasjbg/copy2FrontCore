import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { I18nService } from '@services';
import { Subject, takeUntil } from 'rxjs';
import { COUNTRY_ON_QUERY } from '@core';
import { ButtonComponent } from '@avla/ui-design';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordComponent } from '@shared/components/change-password/change-password.component';
import { AssetUrlPipe } from '@shared';

@Component({
  selector: 'mfapp-change-password-token',
  standalone: true,
  imports: [
    ButtonComponent,
    TranslateModule,
    ChangePasswordComponent,
    AssetUrlPipe
  ],
  templateUrl: './change-password-token.component.html',
  styleUrl: './change-password-token.component.scss'
})
export class ChangePasswordTokenComponent {
  public static PATH = 'change-password';
  public token!: string;
  public isValid!: boolean | undefined;
  public resetForm: boolean = true;
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private i18nService: I18nService = inject(I18nService);

  private readonly destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.getTokenAndLangIfHas();
  }

  private getTokenAndLangIfHas() {
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (params) => {
          params['token'] !== undefined
            ? (this.token = params['token'])
            : (this.token = '');
        },
      });
    this.setLangIfURIHas();
  }

  next() {
    this.router.navigate(['']);
  }

  retrying() {
    this.isValid = undefined;
  }

  private setLangIfURIHas(): void {
    const cdCountry = this.activatedRoute.snapshot.queryParamMap.get(COUNTRY_ON_QUERY);
    if (cdCountry) {
      this.i18nService.setLang(cdCountry.toUpperCase(), true);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
