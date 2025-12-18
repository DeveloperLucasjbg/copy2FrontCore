import { CommonModule } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from "@angular/core";
import { FormGroup, FormBuilder, Validators, AbstractControl, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { ButtonComponent, PasswordInputComponent } from "@avla/ui-design";
import { TranslateModule } from "@ngx-translate/core";
import { AuthService } from "@services";
import { AssetUrlPipe } from "@shared/pipes";
import { passwordConfirm } from "@shared/validator/password-confirm.validator";
import { password } from "@shared/validator/password.validator";
import { firstValueFrom } from "rxjs";

@Component({
  selector: "app-change-password",
  standalone: true,
  imports: [
    PasswordInputComponent,
    ReactiveFormsModule,
    CommonModule,
    ButtonComponent,
    TranslateModule,
    AssetUrlPipe
  ],
  templateUrl: "./change-password.component.html",
  styleUrl: "./change-password.component.scss",
})
export class ChangePasswordComponent {
  @Input() token: string = "";
  @Input() resetForm: boolean = false;
  @Output() resetFormEmit: EventEmitter<any> = new EventEmitter();
  @Output() isValid: EventEmitter<boolean> = new EventEmitter();

  private readonly route = inject(Router);

  public changePasswordTexts = {
    actualPassword: "Actual password",
    password: "Password",
    confirmPassword: "Confirm password",
    validationRequirements: "Your password must contain:",
    charactersQuantity: "At least 8 characters",
    uppercaseLetter: "At least 1 uppercase letter",
    number: "At least 1 number",
    specialCharacters: "At least 1 special character (!@#$%^&*)",
  };
  public passwordForm!: FormGroup;
  public isOpen = false;
  public newPasswordOnFocus = false;
  public validLength!: boolean;
  public validNumber!: boolean;
  public validUppercase!: boolean;
  public validSpecial!: boolean;
  public validPassword!: boolean | undefined;
  public passMessage = "";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.reInit();
  }

  ngOnInit(): void {
    this.buildForm();
    this.changePasswordText();
  }

  private buildForm() {
    const validOldPass = this.token === "" ? [Validators.required] : [];
    this.passwordForm = this.formBuilder.group({
      oldPassword: ["", validOldPass],
      newPassword: [
        "",
        [
          Validators.required,
          password,
          passwordConfirm("repeatNewPassword", true),
        ],
      ],
      repeatNewPassword: [
        "",
        [Validators.required, password, passwordConfirm("newPassword")],
      ],
    });
  }

  get meetsTheFormat(): boolean | undefined {
    return (
      this.validLength &&
      this.validNumber &&
      this.validPassword &&
      this.validSpecial &&
      this.validUppercase
    );
  }

  get newPassword(): AbstractControl<any> | null {
    return this.passwordForm?.get("newPassword");
  }

  get repeatNewPassword(): AbstractControl<any> | null {
    return this.passwordForm?.get("repeatNewPassword");
  }

  private changePasswordText() {
    if (!this.token) {
      this.changePasswordTexts.password = "New password";
      this.changePasswordTexts.confirmPassword = "Confirm new password";
    }
  }

  checkValid(): void {
    const newPassword = this.passwordForm.controls["newPassword"].value;
    const repeatNewPassword =
      this.passwordForm.controls["repeatNewPassword"].value;

    newPassword.length >= 8
      ? (this.validLength = true)
      : (this.validLength = false);

    /\d/.test(newPassword)
      ? (this.validNumber = true)
      : (this.validNumber = false);

    /[A-Z]/.test(newPassword)
      ? (this.validUppercase = true)
      : (this.validUppercase = false);

    /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(newPassword)
      ? (this.validSpecial = true)
      : (this.validSpecial = false);

    this.validPassword =
      this.validLength &&
      this.validNumber &&
      this.validUppercase &&
      this.validSpecial;
    if (!this.validPassword) this.passMessage = "Invalid";
    else if (repeatNewPassword === "") {
      this.passMessage = "Confirm password";
      this.validPassword = false;
    } else if (repeatNewPassword !== newPassword) {
      this.passMessage = "notEquals";
      this.validPassword = false;
    } else this.passMessage = "Valid";
  }

  async save() {
    if (this.passwordForm.valid && this.meetsTheFormat) {
      try {
        const { oldPassword, newPassword, repeatNewPassword } =
          this.passwordForm.value;
        if (newPassword === repeatNewPassword) {
          if (this.token === "") {
            // TODO agregar llamada a servicio change password sin token
          } else {
            await firstValueFrom(
              this.authService.changePasswordWithToken(newPassword, this.token)
            );
          }
          this.isValid.emit(true);
        }
      } catch (error) {
        this.isValid.emit(false);
      }
    }
  }

  get passwordNotAreEquals(): boolean {
    return this.passMessage === "notEquals";
  }

  reInit() {
    if (this.resetForm) {
      if (this.passwordForm) this.passwordForm.reset();
      this.validPassword = undefined;
      setTimeout(() => {
        this.resetFormEmit.emit();
      });
    }
  }

  goToLogin() {
    this.route.navigate([""]);
  }
}
