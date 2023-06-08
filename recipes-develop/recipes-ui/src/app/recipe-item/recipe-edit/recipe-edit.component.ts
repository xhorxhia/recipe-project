import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from 'src/app/image-upload-dialog/image-upload-dialog.component';
import { ImageService } from 'src/app/image-upload-dialog/image.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  recipes!: Recipe[];
  recipe!: Recipe;
  id!: string;
  recipeForm!: FormGroup;
  recipeDate!: string;
  recipeImageSrc!: string;
  recipeImagePath!: string;

  constructor(private recipeService: RecipeService, 
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private imageService: ImageService) {
                this.recipe = new Recipe();
               }

  ngOnInit(): void {
    let today = new Date();
    this.recipeDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    console.log(this.recipeDate);
    this.setId();
    this.recipeService.getRecipeById(this.id).subscribe(
      recipe => {
        this.recipe = recipe;
        this.initForm();
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

  public initForm() {
    let recipeName = this.recipe.name;
    let recipeDescription = this.recipe.description;
    let recipeIngredients: any = new FormArray([]);
    for (let ingredient of this.recipe.ingredients) {
      recipeIngredients.push(new FormGroup({
        'name': new FormControl(ingredient)
      }));
    }
    let recipeSteps: any = new FormArray([]);
    for (let step of this.recipe.steps) {
      recipeSteps.push(new FormGroup({
        'name': new FormControl(step)
      }));
    }
    let recipeDifficulty = this.recipe.recipeDifficulty;
    let recipeCategory = this.recipe.category;
    // Use this when all Recipes have image IDs instead of URLs
    this.imageService.getImage(this.recipe.imagePath).subscribe(
      (res) => {
        this.recipeImageSrc = 'data:image/png;base64,' + res.body.content;
      }
    )

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients,
      'steps': recipeSteps,
      'difficulty': new FormControl(recipeDifficulty),
      'category': new FormControl(recipeCategory)
    })
  }

  onSubmit(){
    const newRecipe = new Recipe();
    newRecipe.id = this.id;
    newRecipe.name = this.recipeForm.value['name'];
    newRecipe.description = this.recipeForm.value['description'];
    let ingredients: string[] = [];
    for (let ingredient of this.recipeForm.value['ingredients']) {
      ingredients.push(ingredient.name);
    }
    newRecipe.ingredients = ingredients;
    let steps: string[] = [];
    for (let step of this.recipeForm.value['steps']) {
      steps.push(step.name);
    }
    newRecipe.steps = steps;
    newRecipe.difficulty = this.recipeForm.value['difficulty'];
    newRecipe.category = this.recipeForm.value['category'];
    newRecipe.date = this.recipeDate;
    newRecipe.author = this.recipe.author;
    newRecipe.imagePath = this.recipeImagePath;
    newRecipe.rating = this.recipe.rating;
    this.recipeService.updateRecipe(this.id, newRecipe).subscribe();
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null)
      })
    );
  }

  onDeleteStep(index: number){
    (<FormArray>this.recipeForm.get('steps')).removeAt(index);
  }

  onAddStep(){
    (<FormArray>this.recipeForm.get('steps')).push(
      new FormGroup({
        'name': new FormControl(null)
      })
    );
  }

  getControlsIngredients() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  getControlsSteps() {
    return (<FormArray>this.recipeForm.get('steps')).controls;
  }

  onUploadRecipeImage() {
    const dialogRef = this.dialog.open(ImageUploadDialogComponent,
      {
        width: "65%"
      });
      dialogRef.afterClosed().subscribe(result => {
        this.recipeImagePath = result;
        this.imageService.getImage(this.recipeImagePath).subscribe(
          (res) => {
            this.recipeImageSrc = 'data:image/png;base64,' + res.body.content;
          }
        )
      });
  }
}
