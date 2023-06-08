import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  public static uppercase(control: FormControl): ValidationErrors | null {
    if(!/[A-Z]/.test(control.value)){
      return { uppercase: true };
    }
    return null;
  }

  public static lowercase(control: FormControl): ValidationErrors | null {
    if(!/[a-z]/.test(control.value)){
      return { lowercase: true };
    }
    return null;
  }

  public static numeric(control: FormControl): ValidationErrors | null {
    if(!/\d/.test(control.value)){
      return { numeric: true };
    }
    return null;
  }

  public static special(control: FormControl): ValidationErrors | null {
    if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(control.value)){
      return { special: true };
    }
    return null;
  }
}
