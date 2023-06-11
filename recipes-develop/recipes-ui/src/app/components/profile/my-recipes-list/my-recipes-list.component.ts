import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Recipe } from "../../../recipe-item/recipe.model";
import { ToolbarService } from "../../../toolbar/toolbar.service";
import { MyRecipesListService } from "./my-recipes-list.service";

@Component({
    selector: "app-my-recipes-list",
    templateUrl: "./my-recipes-list.component.html",
    styleUrls: ["./my-recipes-list.component.css"]
})
export class MyRecipesListCompoent implements OnInit {
    recipes: any[] = [];
    userId: string | undefined;
    deletedRecipes: String[] = [];

    constructor(private myRecipeListService: MyRecipesListService, private toolbarService: ToolbarService,  private router: Router){
        this.toolbarService.loggedInUser.subscribe((state) => {
            this.userId = state.userid;
        });
    }

    ngOnInit(): void {
      
        
        //this.userId = this.toolbarService.userId;
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

    onClickDeleteRecipe(recipeId: string, event: Event){
        event.stopPropagation();
        this.myRecipeListService.deleteRecipe(recipeId).subscribe(response => {
            this.ngOnInit();
        });
    }
}