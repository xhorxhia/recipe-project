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


  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute,
              private router: Router,
              private toolbarService: ToolbarService,
              private imageService: ImageService) {
                this.recipe = new Recipe();
                this.toolbarService.loggedInUser.subscribe(
                  (state: AuthState) =>
                  {
                    console.log(state);
                    this.currentUser.id = state.userid;
                    this.currentUser.username = state.username;
                  }
                );
               }         
  
  ngOnInit(): void {
    this.setId();
    this.recipeService.getRecipeById(this.id).subscribe(
      recipe => {
        this.recipe = recipe;
        console.log(this.recipe);
        
        // console.log(this.currentUser);
        
        this.imageService.getImage(this.recipe.imagePath).subscribe(
          (res) => {
            console.log(res);
            this.recipeImageSrc = 'data:image/png;base64,' + res.body.content;
          }
        );
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
}