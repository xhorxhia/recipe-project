import { Component } from "@angular/core";
import { ToolbarService } from "./toolbar.service";
import { AuthState } from '../interfaces';
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { LoginPageService } from "../login-page/login-page.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { EncryptionPipe } from "../encryption.pipe";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {
  loginState = false;
  userName = ""
  _userId = ""
  loggedUser: any

  constructor(private _service: ToolbarService,
    private _service2: LoginPageService,
    private _snackBar: MatSnackBar,
    private _encryption: EncryptionPipe,
    private _router: Router) { }

  ngOnInit() {
    this.loggedUser = JSON.parse(localStorage.getItem('recipes.loggedUser') || '{}');
    this.loggedUserFnc()
  }

  auth_btnClicked() {
    if (this.loginState == true) {
      this._service.loggedInUser.next(
        {
          state: false,
          userid: "",
          username: "",
        }
      );
      this._router.navigate(['login']);
    }
  }


  private loggedUserFnc() {
    this._service.loggedInUser.next(
      {
        state: true,
        userid: this.loggedUser.id,
        username: this.loggedUser.username,
      }
    )

    this._service.loggedInUser.subscribe(
      (state: AuthState) => {
        this.loginState = state.state
        this._userId = state.userid
        this.userName = state.username
      })
  }

}
