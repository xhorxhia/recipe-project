import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';

import { MatTreeModule } from '@angular/material/tree';
import { EncryptionPipe } from './encryption.pipe';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { CommentSectionComponent } from './recipe-item/comment-section/comment-section.component';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageService } from './login-page/login-page.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterComponent } from './register/register.component';
import { MatTooltipModule } from '@angular/material/tooltip';

import { RecipeService } from './recipe-item/recipe.service';
import { CommentService } from './recipe-item/comment-section/comment.service';
import { MyRecipesListCompoent } from './components/profile/my-recipes-list/my-recipes-list.component';
import { ResipesListComponent } from './components/resipes-list/resipes-list.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { DynamicDatabase } from './recipe-item/comment-section/dynamic-database.service';
import { DynamicDataSource } from './recipe-item/comment-section/dynamic-data-source.service';
import { RecipeEditComponent } from './recipe-item/recipe-edit/recipe-edit.component';
import { ImageUploadDialogComponent } from './image-upload-dialog/image-upload-dialog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyProfileComponent } from './components/profile/myprofile/myprofile.component';
import { UsersService } from './services/users.service';
import { AddRecipeComponent } from './recipe-item/add-recipe/add-recipe.component';
import { AddRatingComponent } from './add-rating/add-rating.component';
import {MatChipsModule} from '@angular/material/chips';


const appRoutes: Routes = [
  {
    path: 'myprofile', component: ProfileComponent
  },

  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    component: ResipesListComponent  // home
  },
  {
    path: 'addRecipe',  component: AddRecipeComponent    // add recete
   // path: 'recipes/:id', component: RecipeItemComponent
  },
  {
    path: 'myrecipes', component: MyRecipesListCompoent
  },
  {
    path: ':id', component: RecipeItemComponent  // get a recete
  },
  {
    path: ':id/edit', component: RecipeEditComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    RecipeItemComponent,
    CommentSectionComponent,
    LoginPageComponent,
    RegisterComponent,
    EncryptionPipe,
    ResipesListComponent,
    SearchFilterPipe,
    MyRecipesListCompoent,
    RecipeEditComponent,
    ImageUploadDialogComponent,
    ProfileComponent,
    MyProfileComponent,
    AddRecipeComponent,
    AddRatingComponent
  ],

  imports: [
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressBarModule,
    MatTreeModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatDialogModule,
    MatTabsModule,
    MatChipsModule
  ],
  exports: [
    RouterModule,
  ],
  providers: [LoginPageService, EncryptionPipe, RecipeService, CommentService, DynamicDatabase, DynamicDataSource, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
