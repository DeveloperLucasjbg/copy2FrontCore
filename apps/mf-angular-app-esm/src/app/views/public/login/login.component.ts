import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, inject, ViewChild } from '@angular/core'
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'

import { Router } from '@angular/router'
import {
  ButtonComponent,
  CheckboxInputComponent,
  CheckboxInputDirective,
  EmailInputComponent,
  EmailInputDirective,
  PasswordInputComponent,
  PasswordInputDirective,
  SelectInterface
} from '@avla/ui-design'
import { LoginBody } from '@interfaces'
import { TranslateModule } from '@ngx-translate/core'
import { AuthService, TokenService } from '@services'
import {
  AssetUrlPipe,
  CountrySelectComponent,
  flagsSelection,
  flagsSelectionLocation
} from '@shared'
import {
  RecaptchaFormsModule,
  RecaptchaModule,
  RecaptchaV3Module,
  ReCaptchaV3Service
} from 'ng-recaptcha-2'
import { firstValueFrom, Subscription } from 'rxjs'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    PasswordInputDirective,
    EmailInputDirective,
    PasswordInputComponent,
    EmailInputComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RecaptchaV3Module,
    FormsModule,
    CommonModule,
    TranslateModule,
    CountrySelectComponent,
    AssetUrlPipe,
    CheckboxInputComponent,
    CheckboxInputDirective,
    ButtonComponent
  ],
  providers: [HttpClient],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private serviceCaptcha = inject(ReCaptchaV3Service)
  public static PATH = 'login'
  public static PATH_P = 'loginp'
  public hiddenV2: boolean = true
  public token: string | undefined
  @ViewChild('recaptcha') recaptchaModel!: NgModel

  private formBuilder = inject(FormBuilder)
  private authService = inject(AuthService)
  private route = inject(Router)
  private tokenService = inject(TokenService)
  private langSubscription?: Subscription

  // Creo el formulario para el Login
  public formLogin: FormGroup = this.formBuilder.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  // Estos son los textos de login
  public loginTexts = {
    formTitle: 'welcome_pandc',
    formSubtitle: 'onboarding_p_c_subtitle',
    email: 'email',
    password: 'password',
    send:'send',
    login: 'lets_start',
    required: 'required',
    recoverPassword: 'forgot_password',
    termsConditions: 'login_terms_conditions',
    termsConditionsUnderlined: 'terms_conditions',
    register1: 'register1',
    register2: 'register2'
  }

  //public flagsLocation = flagsSelectionLocation
  //public flags: SelectInterface[] = flagsSelection

public flags: SelectInterface[] = flagsSelection;
public flagsLocation = flagsSelectionLocation;
private isLoginP = false;
  async ngOnInit(): Promise<any> {
// Captcha init
    this.token = ''
    this.isLoginP = this.route.url.includes(LoginComponent.PATH_P)

    if (this.isLoginP) {
      this.token = ''
    } else if (this.hiddenV2) {
      try {
        this.token = await firstValueFrom(this.serviceCaptcha.execute('login'))
      } catch {
        this.hiddenV2 = false
        return
      }
    }
    // Captcha end

  }
  // Función para Login
  async login () {
    if (this.formLogin.invalid) {
      return
    }

    
    // Body del Login
    try {
      const body: LoginBody = {
        username: this.formLogin?.getRawValue().email,
        password: this.formLogin?.getRawValue().password
      }

      if (this.token || this.isLoginP) {
        const login: any = await firstValueFrom(
          this.authService.login(body, this.token!)
        )
        console.log(login)
        this.tokenService.setToken(login.token)
        await this.route.navigate(["/home"]);
      }
    } catch (error) {
      this.hiddenV2 = this.isLoginP ? this.hiddenV2 : false
    }

    // Body del Login
  }

  // Funcion para validar el recaptcha
  get isDisabled (): boolean {
    if (this.recaptchaModel) {
      return this.formLogin.invalid || (this.recaptchaModel.invalid as boolean)
    } else {
      return this.formLogin.invalid
    }
  }

  public navigateToRecoverPass (): void {
    // this.route.navigate([RecoverPasswordComponent.PATH]);
  }

  ngOnDestroy () {
    this.langSubscription?.unsubscribe()
  }
}
