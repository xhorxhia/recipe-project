import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { RegisterService } from './register.service';
import { EncryptionPipe } from '../encryption.pipe';

import { ErrorMessage } from '../enums';
import { CustomValidators } from './register.custom.validator';

export class EmailErrorStateMatcher implements ErrorStateMatcher {
  // This class is used to run character verification upon the Form's input at the "Email" Field.
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    // For more information on the Double Exclamation: https://www.codingem.com/javascript-double-exclamation-operator/#:~:text=In%20JavaScript%2C%20the%20double%20exclamation%20operator%20converts%20an,objects%20become%20false%20and%20%E2%80%9Ctruthy%E2%80%9D%20objects%20become%20true.
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstNameFormControl = new FormControl('', [Validators.required])
  lastNameFormControl = new FormControl('', [Validators.required])

  usernameFormControl = new FormControl('', [Validators.required])

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  emailMatcher = new EmailErrorStateMatcher();

  passwordFormControl = new FormControl('', [Validators.required, CustomValidators.uppercase, CustomValidators.lowercase, CustomValidators.numeric, CustomValidators.special])
  hidePassword = true;

  promptConfig: MatSnackBarConfig = {
    horizontalPosition: 'center',
    verticalPosition: 'top',
    duration: 2 * 1000
  }

  constructor(private _service: RegisterService, private _encryption: EncryptionPipe, private _snackBar: MatSnackBar, private _router: Router) {}

  ngOnInit(): void {
  }

  submit_btnClicked() {
    if(this.firstNameFormControl.touched == false || this.lastNameFormControl.touched == false || this.usernameFormControl.touched == false || this.emailFormControl.touched == false ||this.passwordFormControl.touched == false){
      this._snackBar.open(ErrorMessage.UntouchedAuthentificationFields, 'OK', this.promptConfig);
    }
    else if(this.firstNameFormControl.status == "INVALID" || this.lastNameFormControl.status == "INVALID" || this.usernameFormControl.status == 'INVALID' || this.emailFormControl.status == 'INVALID' || this.passwordFormControl.status == 'INVALID'){
      this._snackBar.open(ErrorMessage.InvalidAuthentificationFields, 'OK', this.promptConfig);
    }
    else{
      this._service.registerUser(
        {
          firstName: this.firstNameFormControl.value === null ? undefined : this.firstNameFormControl.value,
          lastName: this.lastNameFormControl.value === null ? undefined : this.lastNameFormControl.value,
          username: this.usernameFormControl.value === null ? undefined : this.usernameFormControl.value,
          email: this.emailFormControl.value === null ? undefined : this.emailFormControl.value,
          password: this.passwordFormControl.value === null ? undefined : this._encryption.transform(this.passwordFormControl.value)
        })
        .subscribe(
        (res) => {
          if(res.body.errorFlag == true){
            this._snackBar.open(res.body.reasoning, 'OK', this.promptConfig);
          }
          else{
            this._router.navigate(['/login']);
          }
        },
        (error) => {
          if(error.status == 0){
            this._snackBar.open(ErrorMessage.StatusZeroRequest, 'OK', this.promptConfig);
          }
        })
    }
  }
}
