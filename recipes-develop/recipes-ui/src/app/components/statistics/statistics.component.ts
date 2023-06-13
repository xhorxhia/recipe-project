import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesListService } from 'src/app/services/recipes-list.service';
import { ToolbarService } from 'src/app/toolbar/toolbar.service';



export interface PeriodicElement {
  ingredient: string;
  occurence: number;
}

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  displayedColumns: string[] = ['ingredient', 'occurence'];
  dataSource: any[] = [];
  recipes: any[] = [];
  userId: string | undefined;
  ingredients: any[] = []

  ingMap = new Map()

  constructor(private recipeListService: RecipesListService, private toolbarService: ToolbarService,  private router: Router){
     
    this.toolbarService.loggedInUser.subscribe((state:any) => {
          this.userId = state.userid;
    });
        
}

  ngOnInit(): void {
    if (this.userId !== undefined){
      this.recipeListService.getRecipesList().subscribe(returnRecipes => {
          this.recipes = returnRecipes;
          this. buildTable( this.recipes);
      });  
    }  
    
  }

  getOccurrence(array:any, value:any) {
    return array.filter((v:any) => (v === value)).length;
  }


  buildTable(recipes:any){
    recipes.forEach((recipe:any) => {
      recipe.ingredients.forEach((ing:any) => {
        this.ingredients.push(ing)
      });    
    });

    this.ingredients.forEach((ing:any)=> {
      this.ingMap.set(ing,this.getOccurrence(this.ingredients, ing));
    });

    console.log(this.ingMap);
   let tempTable = []
    for (let entry of this.ingMap.entries()) { 
      let tableObj = {}
      let mapKey = entry[0];
      let mapValue = entry[1];
     
      tableObj={
        ingredient: mapKey,
        occurence: mapValue
      }
      tempTable.push(tableObj)
  }
  console.log(this.dataSource);
    
this.dataSource = tempTable;

  }

}
