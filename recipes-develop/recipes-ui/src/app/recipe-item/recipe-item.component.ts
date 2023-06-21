import { ChangeDetectorRef } from '@angular/core';
import { ApplicationRef } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ImageService } from '../image-upload-dialog/image.service';
import { AuthState } from '../interfaces';
import { ToolbarService } from '../toolbar/toolbar.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  favBtnEnabled = false;
  recipe!: Recipe;
  id!: string;
  currentUser = { id: '', username: '' };
  recipeImageSrc!: string;
  ingredientsList = [];
  ingredientNonChecked: string[] = [];
  ingredientsToCopy : string = '';
  loggedUser: any = {};

  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute,
              private router: Router,
              private toolbarService: ToolbarService,
              private imageService: ImageService) {
                this.recipe = new Recipe();
                this.toolbarService.loggedInUser.subscribe(
                  (state: AuthState) =>
                  {
                    this.loggedUser = state;
                    this.currentUser.id = state.userid;
                    this.currentUser.username = state.username;
                  }
                );
               }         
  
  ngOnInit(): void {
    this.setId();
    this.ingredientsToCopy = "";
    this.recipeService.getRecipeById(this.id).subscribe(
      recipe => {
        this.recipe = recipe;  
        this.imageService.getImage(this.recipe.imagePath).subscribe(
          (res) => {
            this.recipeImageSrc = 'data:image/png;base64,' + res.body.content;
          }
        );

        this.recipe?.ingredients.forEach(ing => {
          this.ingredientNonChecked.push(ing);
          this.ingredientsToCopy = ""
         //this.ingredientsToCopy = this.ingredientsToCopy + ',' + ing
        });

      }
    );
  }

  setId() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
  }

  onFavorite() {
    this.favBtnEnabled = !this.favBtnEnabled;
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  toggle(event: any, ing: any){
   this.ingredientsToCopy = "";

    if(event.checked){
       this.removeItem(ing);     
    }else{
      this.ingredientNonChecked.push(ing);
    }
   
    this.ingredientNonChecked.forEach(x=>{
      this.ingredientsToCopy = this.ingredientsToCopy + ',' + x
    })
 
  }
 
  removeItem(value:any){
    const index: number = this.ingredientNonChecked.indexOf(value);
    this.ingredientNonChecked.splice(index, 1);
  }

}