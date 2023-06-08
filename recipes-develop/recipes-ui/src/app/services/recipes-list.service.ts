import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe-item/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class RecipesListService {

    private recipesListUrl: string;

    constructor(private http: HttpClient) {
        this.recipesListUrl = 'http://localhost:8080/recipes';
    }

    public getRecipesList(): Observable<Recipe[]> {
        return this.http.get<Recipe[]>(this.recipesListUrl);
    }

    public getRecipeById(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.recipesListUrl}/${id}`)
    }

    public addRecipe(recipe: Recipe): Observable<Recipe> {
        return this.http.post<Recipe>(`${this.recipesListUrl}/add`, recipe)
    }
}