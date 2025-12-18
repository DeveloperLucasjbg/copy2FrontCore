import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  NgModel,
  FormsModule,
  FormControl,
} from '@angular/forms';
import { AuthService } from '@services';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { RecoverPasswordInterface } from '@interfaces/recover-password.interface';
import { AssetUrlPipe } from "../../../shared/pipes/asset-url.pipe";
import { RecaptchaFormsModule, RecaptchaModule, RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha-2';
import { ButtonComponent, EmailInputComponent } from '@avla/ui-design';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    FormsModule,
    CommonModule,
    TranslateModule,
    AssetUrlPipe,
    ButtonComponent,
    EmailInputComponent
],
  templateUrl: './recover-password.component.html',
  styleUrl: './recover-password.component.scss',
})
export class RecoverPasswordComponent implements OnInit {
  public static PATH = 'recover-password';

  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private serviceCaptcha = inject(ReCaptchaV3Service);
  private route: Router = inject(Router);

  public hiddenV2: boolean = true;
  public token: string | undefined;

  public recoverPasswordForm!: FormGroup;
  public successfulResponse?: boolean;

  @ViewChild('recaptcha') recaptchaModel!: NgModel;

  public ngOnInit(): void {
    this.recoverPasswordForm = this.formBuilder.group({
      emailToRecover: ['', [Validators.required, Validators.email]],
    });

    console.log(this.recoverPasswordForm);
  }
  get emailToRecover(){
    return this.recoverPasswordForm.get('emailToRecover')?.value;
  }
  public async recoverPassword() {
    if (this.recoverPasswordForm.valid) {
      // Captcha init
      let token = null;
      if (this.hiddenV2) {
        try {
          token = await firstValueFrom(this.serviceCaptcha.execute('login'));
        } catch {
          this.hiddenV2 = false;
          token = this.token;
          return;
        }
      } else {
        token = this.token;
      }
      // Captcha end

      if (token) {
        try {
          const { emailToRecover }: RecoverPasswordInterface =
            this.recoverPasswordForm.value;
          await firstValueFrom(
            this.authService.passwordRecovery(emailToRecover, token),
          );
          this.successfulResponse = true;
        } catch (error) {
          this.successfulResponse = false;
        }
      }
    }
  }

  public reInit() {
    this.successfulResponse = undefined;
    this.recoverPasswordForm.reset();
  }

  public navigateHome() {
    this.reInit();
    // this.route.navigate([LoginComponent.PATH]);
  }
}