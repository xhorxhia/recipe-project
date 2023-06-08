import { Component } from "@angular/core";
import { ToolbarService } from "./toolbar.service";
import { AuthState } from '../interfaces';
import { Router } from "@angular/router";

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent{
  loginState = false;
  userName = ""
  _userId = ""

  constructor(private _service: ToolbarService, private _router: Router) {}

  ngOnInit() {
    this._service.loggedInUser.subscribe(
      (state: AuthState) =>
      {
        this.loginState = state.state
        this._userId = state.userid
        this.userName = state.username
      })
  }

  auth_btnClicked(){
    if(this.loginState == true){
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
}
