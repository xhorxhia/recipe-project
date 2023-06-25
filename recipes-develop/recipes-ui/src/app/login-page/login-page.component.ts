import { Component, OnInit } from "@angular/core";
import {FormControl, Validators} from '@angular/forms';
import { EncryptionPipe } from "../encryption.pipe";
import { LoginPageService } from "./login-page.service";
import { ToolbarService } from "../toolbar/toolbar.service";
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';

import { ErrorMessage } from '../enums';
import { EventService } from "../services/event.servise";

@Component({
    selector: 'app-login',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
    hidePassword: boolean = true;
    password = new FormControl('', [Validators.required]);
    username = new FormControl('', [Validators.required]);

    promptConfig: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2 * 1000
    }

    constructor(private _toolbar: ToolbarService, 
                private _service: LoginPageService, 
                private _snackBar: MatSnackBar, 
                private _encryption: EncryptionPipe, 
                private _router: Router){}
 

    onClick(){
      if(this.username.touched == false || this.password.touched == false){
        this._snackBar.open(ErrorMessage.UntouchedAuthentificationFields, 'OK', this.promptConfig);
      }
      else if(this.username.status == "INVALID" || this.password.status == "INVALID"){
        this._snackBar.open(ErrorMessage.InvalidAuthentificationFields, 'OK', this.promptConfig);
      }
      this._service.loginUser(
        {
          firstName: undefined,
          lastName: undefined,
          username: this.username.value === null ? undefined : this.username.value,
          email: undefined,
          password: this.password.value === null ? undefined : this._encryption.transform(this.password.value)
        })
        .subscribe(
        (res) => {
          console.log(res);
          
          if(res.body?.errorFlag == true){
            this._snackBar.open(res.body.reasoning, 'OK', this.promptConfig);
          }
          else{
            this._toolbar.loggedInUser.next(
              {
                state: true,
                userid: res.body?.entity.id,
                username: res.body.entity.username,
              }
            );
            
            localStorage.setItem('recipes.loggedUser', JSON.stringify(res.body.entity));
            this._router.navigate(['/']);
          }
        },
        (error) => {
          if(error.status == 0){
            this._snackBar.open(ErrorMessage.StatusZeroRequest, 'OK', this.promptConfig);
          }
        })
    }
}
