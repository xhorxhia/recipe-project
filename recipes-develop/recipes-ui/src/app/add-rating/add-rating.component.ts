import { Component, Input, OnInit } from '@angular/core';
import { RecipesListService } from '../services/recipes-list.service';

@Component({
  selector: 'app-add-rating',
  templateUrl: './add-rating.component.html',
  styleUrls: ['./add-rating.component.css']
})
export class AddRatingComponent implements OnInit {

ratings = [1,2,3,4,5];
selectedValue: any;

@Input() recipe: any;

  constructor(
    private recipeService:RecipesListService
  ) { }

  ngOnInit(): void {
  }

  addRate(value: any){

    const rating = {
      userId: this.recipe.author.id,
      recipeId: this.recipe.id,
      stars: value
    }
console.log(rating);

    this.recipeService.addRating(rating).subscribe(res => {
      
    });
    
  }

}
