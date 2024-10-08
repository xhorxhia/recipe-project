import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageUploadDialogComponent } from 'src/app/image-upload-dialog/image-upload-dialog.component';
import { ImageService } from 'src/app/image-upload-dialog/image.service';
import { ToolbarService } from 'src/app/toolbar/toolbar.service';
import { FocusMonitor } from '@angular/cdk/a11y';

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
  show = false;
  showSteps = false;
  ingredientsToshow: any = [];


  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private imageService: ImageService,
              private fb: FormBuilder){

                this.recipe = new Recipe();

                this.recipeForm = new FormGroup({
                  'name': new FormControl(null),
                  'description': new FormControl(null),
                  'ingredients': new FormControl(this.recipe.ingredients),
                  'steps':new FormControl,
                  'difficulty': new FormControl(null),
                  'category': new FormControl(null),
                  'newIngredient':  this.fb.array([this.addKeyValue()]),
                  'newStep': new FormControl(null),
                  'imagePath':new FormControl(null),
                });
               }

  ngOnInit(): void {
    let today = new Date();
    this.recipeDate = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    this.setId();
    this.recipeService.getRecipeById(this.id).subscribe(
      recipe => {
        this.recipe = recipe;
        this.initForm();
        this.getIngredientsToshow(this.recipe.ingredients);
      }
    );
  }

  getIngredientsToshow(ingredients: any){
    this.ingredientsToshow = []

    for (const k of  ingredients) { 
      if(k.key != null && k.value != null) {
        let ing = k.key + " " + k.value
        this.ingredientsToshow.push(ing); 
      }        
    }
  }

  setId() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );
  }

  public initForm() {

    this.recipeForm.patchValue({
      'name': this.recipe.name,
      'description':this.recipe.description,
      'ingredients': this.recipe.ingredients,
      'steps': this.recipe.steps,
      'difficulty': this.recipe.recipeDifficulty,
      'category': this.recipe.category,
      'imagePath': this.recipe?.imagePath
    });
  }

  onSubmit(event: Event){
    event.preventDefault();

    const newRecipe = new Recipe();
    newRecipe.id = this.id;
    newRecipe.name = this.recipeForm.value['name'];
    newRecipe.description = this.recipeForm.value['description'];
    newRecipe.ingredients = this.recipeForm.value['ingredients'];
    newRecipe.steps = this.recipeForm.value['steps'];
    newRecipe.difficulty = this.recipeForm.value['difficulty'];
    newRecipe.category = this.recipeForm.value['category'];
    newRecipe.date = this.recipeDate;
    newRecipe.author = this.recipe.author;
    newRecipe.imagePath = this.recipeForm.value['imagePath'];
    newRecipe.rating = this.recipe.rating;
   
    this.recipeService.updateRecipe(this.id, newRecipe).subscribe();
   this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }


  /////////////////////////////// Ingredients
  get newIngredient(){
    return this.recipeForm.get('newIngredient') as FormArray
  }
  
  
  addKeyValue() {
    return this.fb.group({
      key: new FormControl,
      value: new FormControl
    });
  }

  addIng(): void { 
    this.newIngredient.push(this.addKeyValue());   

    this.addNewIngredient(this.newIngredient.value);
  }

  removeIng(index: any){
    this.newIngredient.removeAt(index);
  }
  
  onIngredientRemoved(i:any){  
    const ingredients = this.recipeForm.get('ingredients')?.value;   
    ingredients.splice(i, 1);
    this.ingredientsToshow.splice(i, 1); // To trigger change detection
    this.recipeForm.get('ingredients')?.setValue(ingredients);
  }

  
  addNewIngredient(value:any){
      const ingredients = this.recipeForm.get('ingredients')?.value; 
  
      // do not allow null values
      for(const k of value){
        if(k.key != null && k.value != null) {
          ingredients.push(k);
        }
      }   
   
      // remove duplicates
      const uniqueArray = ingredients.filter((obj:any, index:any, self:any) => {
        return index === self.findIndex((o:any) => o.key === obj.key && o.value === obj.value);
      });
        
      this.recipeForm.get('ingredients')?.setValue(uniqueArray);
      this.getIngredientsToshow(uniqueArray); // To trigger change detection
  
    }

//////////////////////////////// Steps

  private removeFirst<T>(array: T[], toRemove: T): void {
    const index = array.indexOf(toRemove);
    if (index !== -1) {
        array.splice(index, 1);
    }
  }

  onStepsRemoved(st:any){
    const steps = this.recipeForm.get('steps')?.value ? this.recipeForm.get('steps')?.value : []
    this.removeFirst(steps, st);
    this.recipeForm.get('steps')?.setValue(steps); // To trigger change detection
  }

  toggleAddStepsForm(show: any) {
    show ? this.showSteps = true: this.showSteps = false;
}

  addNewStep(value:any){
    const steps = this.recipeForm.get('steps')?.value != null ? this.recipeForm.get('steps')?.value : []
    steps.push(value);  
    this.recipeForm.get('steps')?.setValue(steps);
    this.showSteps = false;
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
            this.recipeForm.get('imagePath')?.setValue(this.recipeImageSrc);
          }
        )
      });
  }
  
}
