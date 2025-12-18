import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  input,
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

const fileAccept =
  (mimes: readonly string[]): ValidatorFn =>
  (control: AbstractControl): ValidationErrors | null => {
    const file = control.value as File | null;
    if (!file) return { requiredFile: true };
    return mimes.includes(file.type) ? null : { mime: true };
  };

export type AccountType = "checking" | "savings" | "payroll";

export interface BankFormValue {
  bank: string;
  branch: string;
  accountType: AccountType;
  accountNumber: string;
  socialContract: File;
  bankStatement: File;
}
type BankForm = FormGroup<{
  bank: FormControl<string>;
  branch: FormControl<string>;
  accountType: FormControl<AccountType>;
  accountNumber: FormControl<string>;
  socialContract: FormControl<File | null>;
  bankStatement: FormControl<File | null>;
}>;

@Component({
  selector: "mfapp-step-bank",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./step-bank.component.html",
  styleUrl: "./step-bank.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepBankComponent implements OnInit {
  banks = input<readonly string[]>([
    "Banco do Brasil",
    "Bradesco",
    "Itaú",
    "Santander",
  ] as const);
  submitted = output<BankFormValue>();

  protected form!: BankForm;
  protected readonly submitting = signal(false);

  private readonly fb = inject(NonNullableFormBuilder);
  private static readonly ALLOWED: readonly string[] = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ] as const;

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm(): BankForm {
    return this.fb.group({
      bank: this.fb.control("", [Validators.required]),
      branch: this.fb.control("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
      accountType: this.fb.control<AccountType>("checking", [
        Validators.required,
      ]),
      accountNumber: this.fb.control("", [
        Validators.required,
        Validators.maxLength(20),
      ]),
      socialContract: this.fb.control<File | null>(null, [
        fileAccept(StepBankComponent.ALLOWED),
      ]),
      bankStatement: this.fb.control<File | null>(null, [
        fileAccept(StepBankComponent.ALLOWED),
      ]),
    });
  }

  protected setFile(
    control: "socialContract" | "bankStatement",
    file: File | null
  ): void {
    const ctrl = this.form.controls[control];
    ctrl.setValue(file);
    ctrl.markAsDirty();
    ctrl.updateValueAndValidity();
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    const { socialContract, bankStatement, ...rest } = this.form.getRawValue();
    this.submitted.emit({
      ...rest,
      socialContract: socialContract!,
      bankStatement: bankStatement!,
    });
    this.submitting.set(false);
  }

  protected hasError(ctrl: AbstractControl | null | undefined): boolean {
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
}
