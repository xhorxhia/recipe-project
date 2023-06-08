import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../../../interfaces";
import { Recipe } from '../../../recipe-item/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class MyRecipesListService{
    private recipeURL: string = 'http://localhost:8080/recipes';
    private userURL: string = 'http://localhost:8080/users';


    constructor(private httpClient: HttpClient){}

    public getRecipesList(): Observable<Recipe[]>{
        return this.httpClient.get<Recipe[]>(this.recipeURL);
    }

    public getUserById(id: string): Observable<User>{
        return this.httpClient.get<User>(`${this.userURL}/${id}`);
    }

    public getRecipesByAuthor(authorId: string): Observable<Recipe[]>{
        return this.httpClient.get<Recipe[]>(`${this.recipeURL}/filter/author/${authorId}`);
    }

    public deleteRecipe(recipeId: string){
        return this.httpClient.delete(`${this.recipeURL}/delete/${recipeId}`);
    }
}