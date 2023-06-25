import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageUploadDialogComponent } from 'src/app/image-upload-dialog/image-upload-dialog.component';
import { ImageService } from 'src/app/image-upload-dialog/image.service';
import { ToolbarService } from 'src/app/toolbar/toolbar.service';
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
    userImageSrc!: string;
    userImagePath!: string;

    currentUser: any = {};

    constructor(private usersService: UsersService,
                private dialog: MatDialog,
                private imageService: ImageService,
                private toolbarService: ToolbarService,
                private router: Router) {
                  
                  this.toolbarService.loggedInUser.subscribe((state) => {
                    this.currentUser = state;
                    console.log(this.currentUser);
                    
                });
    }

    ngOnInit(): void {
      this.loggedUser = JSON.parse(localStorage.getItem('recipes.loggedUser') || "{}");

     if(!this.currentUser.state){
       this.router.navigate(['/']);
     }
    }



    onEdit(): void {
      this.editMode = !this.editMode;
    }

    onCancel():void {
      this.editMode = !this.editMode;
    }

    onUploadRecipeImage() {
      const dialogRef = this.dialog.open(ImageUploadDialogComponent,
        {
          width: "65%"
        });
        dialogRef.afterClosed().subscribe(result => {
          this.userImagePath = result;
          console.log(result);
          
          this.imageService.getImage(this.userImagePath).subscribe(
            (res) => {
              this.userImageSrc = 'data:image/png;base64,' + res.body.content;
              this.loggedUser.imagePath = this.userImageSrc;
              //this.recipeForm.get('imagePath')?.setValue(this.recipeImageSrc);
            }
          )
        });
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