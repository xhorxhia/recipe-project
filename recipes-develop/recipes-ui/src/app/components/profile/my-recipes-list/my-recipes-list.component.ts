import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../../../recipe-item/recipe.model";
import { ToolbarService } from "../../../toolbar/toolbar.service";
import { MyRecipesListService } from "./my-recipes-list.service";
import {ConfirmationDialog} from '../../../confirm-dialog/confirm-dialog.component';
import { MatDialog } from "@angular/material/dialog";


@Component({
    selector: "app-my-recipes-list",
    templateUrl: "./my-recipes-list.component.html",
    styleUrls: ["./my-recipes-list.component.css"]
})
export class MyRecipesListCompoent implements OnInit {
    recipes: any[] = [];
    userId: string | undefined;
    deletedRecipes: String[] = [];
    id: string='';
    toBeDeleted: any = null;

    constructor(private myRecipeListService: MyRecipesListService, 
        private toolbarService: ToolbarService,  
        private router: Router,
        private dialog: MatDialog){
        this.toolbarService.loggedInUser.subscribe((state) => {  
            this.userId = state.userid;
        });
    }

    ngOnInit(): void {
      
        if (this.userId !== undefined){
            this.myRecipeListService.getRecipesByAuthor(this.userId).subscribe(returnRecipes => {
                this.recipes = returnRecipes;
                console.log( this.recipes );
            });
        }
    }
    
    openRecipeDetails(recipeId: string){
        this.router.navigate(['recipes', recipeId]);
    }

    onClickDeleteRecipe(recipeId: string){
        //event.stopPropagation();
        this.myRecipeListService.deleteRecipe(recipeId).subscribe(response => {
            this.ngOnInit();
        });
    }
    
    goToEdit(id:any){
        console.log(id);  
        this.router.navigate([id+'/edit']);
    }
    
    openDialog(id: any) {
        const dialogRef = this.dialog.open(ConfirmationDialog,{
          data:{
            message: 'Are you sure want to delete?',
            buttonText: {
              ok: 'Save',
              cancel: 'No'
            }
          }
        });
    
        dialogRef.afterClosed().subscribe((confirmed: boolean) => {
          if (confirmed) {         
            const a = document.createElement('a');
            this.onClickDeleteRecipe(id)          
          }
        });
      }
}