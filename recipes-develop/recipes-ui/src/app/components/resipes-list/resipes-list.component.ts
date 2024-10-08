import { Component, OnInit } from '@angular/core';
import { RecipesListService } from 'src/app/services/recipes-list.service';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Recipe } from 'src/app/recipe-item/recipe.model';
import { User } from 'src/app/interfaces';
import { ToolbarService } from 'src/app/toolbar/toolbar.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-resipes-list',
  templateUrl: './resipes-list.component.html',
  styleUrls: ['./resipes-list.component.css']
})
export class ResipesListComponent implements OnInit {
  recipes: Recipe[] = [];

  originalRecipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  public searchFilter: any = '';
  public query: string = '';

  selectedStars: String[] = [];
  selectedNumber = 0;

  nothingSelected: boolean = false;

  enumDifficulties: string[] = ['Easy', 'Medium', 'Advanced', 'Unrated'];

  loggedUser: any ={}
test:any

  constructor(private recipesListService: RecipesListService, 
              private router: Router,
              private toolbarService: ToolbarService,
              private _sanitizer: DomSanitizer) { 
    this.toolbarService.loggedInUser.subscribe((state) => {
      this.loggedUser = state
      //console.log(this.loggedUser);
    }); 
}

  ngOnInit(): void {

    this.recipesListService.getRecipesList().subscribe(data => {
      this.originalRecipes = data;
      this.recipes = this.originalRecipes
      
    })


  }



  onChangeDemo(ob: MatCheckboxChange) {
    console.log("checked: " + ob.checked);
    console.log((Number), ob.source.value)

    if (ob.checked == true) {
      this.selectedStars.push(ob.source.value)
      this.selectedNumber++;
      this.recipes = this.originalRecipes.filter((recipe) => {
        return this.selectedStars.indexOf(recipe.stars.toString()) != -1;

      })
    } else if (ob.checked == false) {
      this.selectedNumber--;
      this.selectedStars.forEach((element, index) => {
        if (element == ob.source.value) {
          delete this.selectedStars[index]
        }
      })
      this.recipes = this.originalRecipes.filter((recipe) => {
        return this.selectedStars.indexOf(recipe.stars.toString()) != -1;
      })
    } else if (this.selectedStars.length === 0 && ob.checked == false) {
      this.recipes = this.originalRecipes
    }

    if (this.selectedNumber == 0) {
      this.recipes = this.originalRecipes;
      this.nothingSelected = false
    }
    this.filteredRecipes = this.recipes;
  }

  onSelectEvent(value: any) {
    if (value == null) {
      if (this.selectedStars.length == 0) {
        this.recipes = this.originalRecipes;
      } else {
        this.recipes = this.originalRecipes.filter((recipe) => {
          return this.selectedStars.indexOf(recipe.stars.toString()) != -1;
        })
      }

    } else {
      if (this.selectedStars.length == 0) {
        this.recipes = this.originalRecipes.filter((recipe) => {
          return value.indexOf(recipe.difficulty) != -1;
        })
      } else {
        this.recipes = this.filteredRecipes.filter((recipe) => {
          return value.indexOf(recipe.difficulty) != -1;
        })
      }
    }
  }

  addRecipe() {

    this.router.navigate(['/addRecipe']);
  }

  openRecipeDetails(id: string): void {
    this.router.navigate(['', id]);
  }

}

