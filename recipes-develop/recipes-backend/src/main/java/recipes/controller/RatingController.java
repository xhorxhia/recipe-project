package recipes.controller;

import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import recipes.domain.Comment;
import recipes.domain.Rating;
import recipes.domain.Recipe;
import recipes.repository.RatingsRepository;
import recipes.repository.RecipeRepository;

import java.util.Optional;


@RestController
@RequestMapping("/recipes/stars")
public class RatingController {


    @Autowired
    private RecipeRepository recipeRepository;

    @RequestMapping(value = "add", method = RequestMethod.POST)
    public void addStars(@RequestBody Rating rating) {

       Recipe recipe = recipeRepository.findRecipeById(rating.getRecipeId());
       Long count = recipe.getCount(); // number of people rating

       if(recipe != null){

           if(recipe.getStars() == 0){
               recipe.setStars(rating.getStars());
               count = count + 1;
               recipe.setCount(count);
               recipeRepository.save(recipe);
           }
           // calculate avg
           else{


               Float currentAvg = recipe.getStars();
               Float newRating = rating.getStars();
               Float newAvg = ((currentAvg*count) + newRating)/(count+1);
               String formattedString = String.format("%.02f", newAvg);
               newAvg = Float.parseFloat(formattedString);

               count = count + 1;
               recipe.setStars(newAvg);
               recipe.setCount(count);
               recipeRepository.save(recipe);
           }
       }

    }


}
