import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { MyProfileComponent } from "./components/profile/myprofile/myprofile.component";
import { ResipesListComponent } from "./components/resipes-list/resipes-list.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RecipeEditComponent } from "./recipe-item/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RegisterComponent } from "./register/register.component";



const routes: Routes = [
    // { path: 'register', component: RegisterComponent },
    // { path: 'recipes', component: LoginPageComponent },
    // { path: 'home', component: ResipesListComponent }, 
   // { path: 'recipes', component: RecipeItemComponent },
];
  

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }


  