import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap, Observable } from "rxjs";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    private recipesUrl: string;

    constructor(private http: HttpClient) {
        this.recipesUrl = 'http://localhost:8080/recipes';
    }

    public getRecipes(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.recipesUrl).pipe(
            tap(data => console.log(data))
        );
    }

    public getRecipeById(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(this.recipesUrl+'/'+id).pipe(
            tap(data => console.log(data))
        );
    }

    public updateRecipe(id: string, recipe: Recipe) {
        const body = JSON.stringify(recipe);
        return this.http.put<Recipe>(this.recipesUrl+'/update/'+id, body,
                                     { headers: { 'Content-Type': 'application/json' } });
    }
    
}