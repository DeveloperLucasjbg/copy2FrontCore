import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  output,
  signal,
  inject,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from "@angular/forms";

const strongPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const v = String(control.value ?? "");
  const ok =
    v.length >= 8 && /[A-Z]/.test(v) && /\d/.test(v) && /[^A-Za-z0-9]/.test(v);
  return ok ? null : { weak: true };
};

const sameAs =
  (other: () => AbstractControl | null): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null =>
    control.value === other()?.value ? null : { notEqual: true };

export interface PasswordFormValue {
  password: string;
}

type PasswordForm = FormGroup<{
  password: FormControl<string>;
  repeat: FormControl<string>;
}>;

@Component({
  selector: "mfapp-step-password",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./step-password.component.html",
  styleUrl: "./step-password.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepPasswordComponent implements OnInit {
  submitted = output<PasswordFormValue>();

  protected form!: PasswordForm;
  protected readonly submitting = signal(false);

  private readonly fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm(): PasswordForm {
    return this.fb.group({
      password: this.fb.control("", {
        validators: [Validators.required, strongPassword],
        updateOn: "blur",
      }),
      repeat: this.fb.control("", {
        validators: [
          Validators.required,
          sameAs(() => this.form?.controls.password ?? null),
        ],
        updateOn: "blur",
      }),
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.submitted.emit({
      password: this.form.controls.password.getRawValue(),
    });
    this.submitting.set(false);
  }

  protected hasError(ctrl: AbstractControl | null | undefined): boolean {
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
}
