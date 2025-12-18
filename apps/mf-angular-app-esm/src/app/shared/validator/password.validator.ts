import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

const messagePattern: any[] = [
  {
    message: 'At least 8 characters',
    pattern: function (val: string) {
      return val ? ('' + val).length >= 8 : false;
    },
  },
  {
    message: 'At least 1 number',
    pattern: function (val: string) {
      const format = /\d/;
      return val ? format.test(val) : false;
    },
  },
  {
    message: 'At least 1 uppercase letter',
    pattern: function (val: string) {
      const format = /[A-Z]/;
      return val ? format.test(val) : false;
    },
  },
  {
    message: 'At least 1 special character (!@#$%^&*)',
    pattern: function (val: string) {
      const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
      return val ? format.test(val) : false;
    },
  },
];

export function password(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let value = control.value as string;
    let output: any = {};
    let isValid = true;
    if (value) {
      if (!messagePattern[0].pattern(value)) {
        output['min'] = true;
        isValid = false;
      }
      if (!messagePattern[1].pattern(value)) {
        output['number'] = true;
        isValid = false;
      }
      if (!messagePattern[2].pattern(value)) {
        output['lower'] = true;
        isValid = false;
      }
      if (!messagePattern[3].pattern(value)) {
        output['special'] = true;
        isValid = false;
      }
      return output;
    }
    return null;
  };
}