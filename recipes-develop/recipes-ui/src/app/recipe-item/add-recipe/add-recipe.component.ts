import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  
  addRecipeForm: FormGroup = new FormGroup({});
  difficultyArray = ['Easy',    'Medium',    'Advanced',    'Unrated'];
  loggedUser: User = {};
  recipeImageSrc!: string;
  recipeImagePath!: string;
  ingredientslist: any;

  constructor(private fb: FormBuilder,
              private recipeService: RecipesListService,
              private _router: Router,
              private dialog: MatDialog,
              private imageService: ImageService             
              ) {

              this.addRecipeForm = fb.group({
                'name': [null, Validators.required],
                'category': [null, Validators.required],
                'difficulty': [null, Validators.required],
                'date': [null, Validators.required],
                'description': [null, Validators.required],
                'ingredients':  fb.array([this.addKeyValue()]), 
                'steps': [null, Validators.required], 
                'imagePath':[null, Validators.required],              
              })
   }

  ngOnInit(): void {

    this.loggedUser = JSON.parse(localStorage.getItem('recipes.loggedUser') || "{}");
    console.log(this.loggedUser);
    
  
  }

  addRecipe(post: any){
   
    //console.log(post);

    let steps = []
    steps = post?.steps?.split(",");

    let ingredients = [];    
    for(const k of post.ingredients){
      if(k.key != '' && k.value != '') {
        ingredients.push(k);
      }
    }     

    const recipe = {
      name: post.name,
      category: post.category,
      recipeDifficulty: post.difficulty,
      date: post.date,
      description: post.description,
      ingredients:  ingredients,
      author: this.loggedUser, 
      steps: steps,
      imagePath: this.recipeImageSrc,
      fileName: this.recipeImagePath
        
    }

      // const formData: FormData = new FormData();  
      //   formData.append('file', this.file);
       
    this.recipeService.addRecipe( recipe).subscribe(res => {

    });
    this.addRecipeForm.reset();

    this._router.navigate(['/']);
  }

  get ingredients(){
    return this.addRecipeForm.get('ingredients') as FormArray
  }

  
  addKeyValue() {
   return this.fb.group({
     key: [''],
     value: ['']
   });
  }
  

  removeIng(index: any){
    this.ingredients.removeAt(index);
  }


  addIng(): void {
    this.ingredients.push(this.addKeyValue());
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


  // upload() {
  //   this.progress.percentage = 0;
  //   // this.currentFileUpload = this.selectedFiles.item(0);
  //   this.recipeService.addRecipe(this.selectedFiles.item(0)).subscribe(res => {
  //     console.log(res, "SDSDSDSD");
      
  //     if (res.type === HttpEventType.UploadProgress) {
  //       this.progress.percentage = Math.round(100 * res.loaded / res.total);
  //     } else if (res instanceof HttpResponse) {
  //        alert('File Successfully Uploaded');
  //     }  

  //   });

  // }
  // selectFile(event:any) {
  //   this.selectedFiles = event.target.files;
  // }



// file!: File

//   onFileSelected(event: any): void {
//     this.file = event.target.files[0];
//     console.log(this.file , "Event");

   
    // this.imageService.getImage(this.recipeImagePath).subscribe(
    //   (res) => {
    //     this.recipeImageSrc = 'data:image/png;base64,' + res.body.content;
    //     this.addRecipeForm.get('imagePath')?.setValue(this.recipeImageSrc);
    //   }
    // )
    // Use the 'file' variable as needed
  //}

}