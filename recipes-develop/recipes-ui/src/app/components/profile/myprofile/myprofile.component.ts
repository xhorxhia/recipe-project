import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UsersService } from '../../../services/users.service';


@Component({
    selector: 'my-profile',
    templateUrl: './myprofile.component.html',
    styleUrls: ['./myprofile.component.css']
  })
export class MyProfileComponent implements OnInit {

    loggedUser: User = {};
    editMode: boolean = false;

    firstName = "Ion";
    lastName = "Popescu";
    email = "a@b.com";
    password = "asd";
    confirmPassword = "";

    constructor(private usersService: UsersService) {
      /*
      let user = {id: "630e0e39463dcce95ffd2719", firstName: "firstName", lastName: "lastName", email: "my@email.com", username: ""};
      localStorage.setItem('recipes.loggedUser', JSON.stringify(user));
      */
    }

    ngOnInit(): void {
      this.loggedUser = JSON.parse(localStorage.getItem('recipes.loggedUser') || "{}");
     console.log(this.loggedUser);
    }



    onEdit(): void {
      this.editMode = !this.editMode;
    }

    onCancel():void {
      this.editMode = !this.editMode;
    }

    onSave():void {
      this.editMode = !this.editMode;
      this.usersService.updateUser(this.loggedUser).subscribe(response => {
        if(response) {
          localStorage.setItem('recipes.loggedUser', JSON.stringify(this.loggedUser));
        }
      });
    }
}