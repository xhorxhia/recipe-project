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
  ingredients: any[] = []; 
  ingMap = new Map();

  difficulties: any[] = [];
  dataSource2: any[] = [];
  difficultyMap = new Map();
  displayedColumns2: string[] = ['difficulty', 'occurence'];

  users: any = [];
  dataSource3: any[] = [];
  usersMap = new Map();
  displayedColumns3: string[] = ['users', 'recipes'];

  constructor(private recipeListService: RecipesListService, private toolbarService: ToolbarService,  private router: Router){
     
    this.toolbarService.loggedInUser.subscribe((state:any) => {
          this.userId = state.userid;
    });
        
}

  ngOnInit(): void {
    if (this.userId !== undefined){
      this.recipeListService.getRecipesList().subscribe(returnRecipes => {
          this.recipes = returnRecipes;
          console.log(this.recipes);
          
          this. buildTable(this.recipes);
      });  
    }  
    
  }

  getOccurrence(array:any, value?:any) { 

    return array.filter((v:string) => (v == value)).length;
  }


  buildTable(recipes: any) {
    this.ingredients = []
    recipes.forEach((recipe: any) => {
      recipe.ingredients.forEach((ing: any) => {
        if(ing != null && ing !=""){
         this.ingredients.push(ing.trim()) 
        }
        
      });
      this.difficulties.push(recipe.difficulty);

      this.users.push(recipe.author.username)
    });

    this.ingredients.forEach((ing: any) => {
      if(ing != null && ing !=""){
        this.ingMap.set(ing, this.getOccurrence(this.ingredients, ing.trim()));
      }
    });

    this.difficulties.forEach((dif: any) => {
      this.difficultyMap.set(dif, this.getOccurrence(this.difficulties, dif));
    });

    this.users.forEach((usr: any) => {
      this.usersMap.set(usr, this.getOccurrence(this.users, usr));
    });

    //find top 3 users
    const mapEntries = Array.from(this.usersMap.entries());
    mapEntries.sort((a, b) => b[1] - a[1]);
    const top3Values = mapEntries.slice(0, 3);

    console.log(top3Values);
    
    //ingredients
    let tempTable = []
    for (let entry of this.ingMap.entries()) {
      let tableObj = {}
      let mapKey = entry[0];
      let mapValue = entry[1];

      tableObj = {
        ingredient: mapKey,
        occurence: mapValue
      }
      tempTable.push(tableObj);
      this.dataSource = tempTable;
    }

     
    // difficulty
    let tempTable2 = []
    for (let entry of this.difficultyMap.entries()) {
      let tableObj = {}
      let mapKey = entry[0];
      let mapValue = entry[1];

      tableObj = {
        difficulty: mapKey,
        occurence: mapValue
      }
      tempTable2.push(tableObj);
      this.dataSource2 = tempTable2;
    }

    // users
    let tempTable3 = []
    for (let v of top3Values) {
      let tableObj = {}
      let mapKey = v[0];
      let mapValue = v[1];

      tableObj = {
        users: mapKey,
        recipes: mapValue
      }
      tempTable3.push(tableObj);
      this.dataSource3 = tempTable3;
    }

  }

}
