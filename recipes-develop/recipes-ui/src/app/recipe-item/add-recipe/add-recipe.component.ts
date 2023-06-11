import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ImageUploadDialogComponent } from 'src/app/image-upload-dialog/image-upload-dialog.component';
import { ImageService } from 'src/app/image-upload-dialog/image.service';
import { User } from 'src/app/models/user.model';
import { RecipesListService } from 'src/app/services/recipes-list.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  
  addRecipeForm: FormGroup;
  difficultyArray = ['Easy',    'Medium',    'Advanced',    'Unrated'];
  loggedUser: User = {};
  recipeImageSrc!: string;
  recipeImagePath!: string;

  constructor(private fb: FormBuilder,
              private recipeService: RecipesListService,
              private _router: Router,
              private dialog: MatDialog,
              private imageService: ImageService,
              ) {

              this.addRecipeForm = fb.group({
                'name': [null, Validators.required],
                'category': [null, Validators.required],
                'difficulty': [null, Validators.required],
                'date': [null, Validators.required],
                'description': [null, Validators.required],
                'ingredients': [null, Validators.required],  
                'steps': [null, Validators.required], 
                'imagePath':[null, Validators.required],              
              })
   }

  ngOnInit(): void {

    this.loggedUser = JSON.parse(localStorage.getItem('recipes.loggedUser') || "{}");
  
  }

  addRecipe(post: any){
    let ingredients = []
    ingredients = post.ingredients.split(",");

    let steps = []
    steps = post.steps.split(",");

    const recipe = {
      name: post.name,
      category: post.category,
      recipeDifficulty: post.difficulty,
      date: post.date,
      description: post.description,
      ingredients: ingredients,
      author: this.loggedUser, 
      steps: steps,
      imagePath: this.recipeImageSrc 
        
    }
    console.log(post);
    this.recipeService.addRecipe(recipe).subscribe(res => {

    });
    this.addRecipeForm.reset();

    this._router.navigate(['/']);
  }


  onUploadRecipeImage() {
    const dialogRef = this.dialog.open(ImageUploadDialogComponent,
      {
        width: "65%"
      });
      dialogRef.afterClosed().subscribe(result => {
        this.recipeImagePath = result;
        console.log(result);
        
        this.imageService.getImage(this.recipeImagePath).subscribe(
          (res) => {
            this.recipeImageSrc = 'data:image/png;base64,' + res.body.content;
            this.addRecipeForm.get('imagePath')?.setValue(this.recipeImageSrc);
          }
        )
      });
  }

  

}
