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

const brPhoneValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const digits = String(control.value ?? "").replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 11 ? null : { brPhone: true };
};

type BrazilCC = "55";
export interface CompanyFormValue {
  dni: string;
  susep: string;
  legalName: string;
  email: string;
  phoneCountry: BrazilCC;
  phone: string;
  contactName: string;
  commercialOwner: string;
}

type CompanyForm = FormGroup<{
  dni: FormControl<string>;
  susep: FormControl<string>;
  legalName: FormControl<string>;
  email: FormControl<string>;
  phoneCountry: FormControl<BrazilCC>;
  phone: FormControl<string>;
  contactName: FormControl<string>;
  commercialOwner: FormControl<string>;
}>;

@Component({
  selector: "mfapp-step-company",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./step-company.component.html",
  styleUrl: "./step-company.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepCompanyComponent implements OnInit {
  commercialOptions = input<readonly string[]>([
    "Commercial owner",
    "Sales",
    "Partnerships",
  ] as const);
  submitted = output<CompanyFormValue>();

  protected form!: CompanyForm;
  protected readonly submitting = signal(false);

  private readonly fb = inject(NonNullableFormBuilder);

  ngOnInit(): void {
    this.form = this.buildForm();
  }

  private buildForm(): CompanyForm {
    return this.fb.group({
      dni: this.fb.control("", {
        validators: [Validators.required],
        updateOn: "blur",
      }),
      susep: this.fb.control("", {
        validators: [Validators.required, Validators.maxLength(30)],
        updateOn: "blur",
      }),
      legalName: this.fb.control("", [
        Validators.required,
        Validators.maxLength(160),
      ]),
      email: this.fb.control("", {
        validators: [Validators.required, Validators.email],
        updateOn: "blur",
      }),
      phoneCountry: this.fb.control<BrazilCC>("55"),
      phone: this.fb.control("", [Validators.required, brPhoneValidator]),
      contactName: this.fb.control("", [
        Validators.required,
        Validators.maxLength(120),
      ]),
      commercialOwner: this.fb.control("", [Validators.required]),
    });
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting.set(true);
    this.submitted.emit(this.form.getRawValue());
    this.submitting.set(false);
  }

  protected hasError(ctrl: AbstractControl | null | undefined): boolean {
    return !!ctrl && ctrl.invalid && (ctrl.touched || ctrl.dirty);
  }
}
