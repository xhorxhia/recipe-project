import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../recipe-item/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class RecipesListService {

    private recipesListUrl: string;
    private ratingUrl: string;

    constructor(private http: HttpClient) {
        this.recipesListUrl = 'http://localhost:8080/recipes';
        this.ratingUrl = 'http://localhost:8080/recipes/stars';
    }

    public getRecipesList(): Observable<Recipe[]> {
        return this.http.get<any[]>(this.recipesListUrl);
    }

    public getRecipeById(id: string): Observable<Recipe> {
        return this.http.get<Recipe>(`${this.recipesListUrl}/${id}`)
    }

    public addRecipe(file:any) {
        //var headers = new HttpHeaders({'Content-Type': 'multipart/form-data; boundary=5000'}); //multipart/form-data

        return this.http.post<any>(`${this.recipesListUrl}/add`,file ) 
        
    }

    public addRating(rate: any) {
        return this.http.post<any>(`${this.ratingUrl}/add`, rate)
    }
}
