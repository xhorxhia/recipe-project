package recipes.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.mongodb.DBRef;
import recipes.domain.Rating;
import recipes.domain.Recipe;
import recipes.domain.User;
import recipes.dtos.RecipeDTO;
import recipes.repository.RatingsRepository;
import recipes.repository.RecipeRepository;
import recipes.repository.UserRepository;
import recipes.services.RecipeService;

@RestController
@RequestMapping("/recipes")
public class RecipeController {
	
	@Autowired
	private RecipeRepository recipeRepository;

	@Autowired
	private RecipeService recipeService;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RatingsRepository ratingsRepository;

	@GetMapping
	public ResponseEntity<List<Recipe>> findAll(){
//		return new ResponseEntity<>(this.recipeService.getAllRecipes(), HttpStatus.OK);
		List<Recipe> recipes = recipeRepository.findAll();
		return new ResponseEntity<>(recipes, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	public ResponseEntity<RecipeDTO> getRecipe(@PathVariable String id) {
		try {
			Optional<Recipe> recipe = this.recipeRepository.findById(id);
			// ! The "FOUND" Status (Code 302) is a Redirection Status Code.
			// ! The client MUST take additional action to complete the request.
			// ! ~ Tavi <3
			if (recipe.isPresent()) {

				RecipeDTO rec = new RecipeDTO(recipe.get());
				rec.setStars(recipe.get().getStars());
				return new ResponseEntity<>(rec, HttpStatus.OK);
			}
			
			return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
			
		}catch(IllegalArgumentException exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}

	@PostMapping("/add")
	public ResponseEntity<RecipeDTO> addRecipe(@RequestBody RecipeDTO recipeDto) {
		//Optional<User> authOpt = this.userRepository.findById(recipeDto.getAuthor().getId());
		
//		if(!authOpt.isPresent()){
//			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//		}
		
		Recipe recipe = new Recipe();
		recipe.setName(recipeDto.getName());
		recipe.setCategory(recipeDto.getCategory());
		recipe.setDifficulty(recipeDto.getRecipeDifficulty());
		recipe.setDate(recipeDto.getDate());
		recipe.setDescription(recipeDto.getDescription());
		recipe.setIngredients(recipeDto.getIngredients());
		recipe.setAuthor(recipeDto.getAuthor());
		recipe.setSteps(recipeDto.getSteps());
		recipe.setImagePath(recipeDto.getImagePath());
//		recipe.setAuthor(authOpt.get());

		
		
		Recipe savedRecipe = this.recipeRepository.save(recipe);
		
		if (savedRecipe != null) {
			return new ResponseEntity<>(new RecipeDTO(savedRecipe), HttpStatus.CREATED);
		}
		
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}
	


	//Userul poate sa fie pus de oricine oricum, apare aceeasi problema ca la metoda de mai sus
	@PostMapping("/rating/add")
	public ResponseEntity<Rating> addRating (@RequestBody Rating rating){

		if(ratingsRepository.findOne(Example.of(rating)).isPresent()){
            return ResponseEntity.noContent().build();
        }
		ratingsRepository.save(rating);
        return ResponseEntity.ok().body(rating);
	}


	@RequestMapping(value = "/delete/{id}", method = {RequestMethod.DELETE})
	public ResponseEntity<?> deleteRecipe(@PathVariable String id) {
		try {
			System.out.println(id);
			this.recipeRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch(IllegalArgumentException exception) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@GetMapping("filter/author/{authorId}")
	public ResponseEntity<List<RecipeDTO>> getRecipesByAuthor(@PathVariable String authorId){
		try {
		//DBRef authorDBRef = new DBRef("users", authorId);
		User user  = userRepository.findById(authorId).get();
		List<RecipeDTO> recipesDTO = new ArrayList<>();
		List<Recipe> recipes = this.recipeRepository.findByAuthor(user);
		recipes.forEach(recipe -> {
			RecipeDTO recipedto = new RecipeDTO(recipe);
			this.recipeService.getAvgRatings().forEach(avgRating -> {
				if (avgRating.get_id().equals(String.valueOf(recipe.getId()))) {	
					recipedto.setStars((long) avgRating.getRating());
				}
			});
			recipesDTO.add(recipedto);
		});
		return new ResponseEntity<>(recipesDTO , HttpStatus.OK);
		} catch(IllegalArgumentException exception) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
	

	@PutMapping(value="/update/{id}")
	public ResponseEntity<Recipe> updateRecipe(@PathVariable String id, @RequestBody Recipe updateRecipe){
		if (id.equals(updateRecipe.getId())) {
			try {
				Recipe updateReturnRecipe = this.recipeRepository.save(updateRecipe);
				return new ResponseEntity<>(updateReturnRecipe, HttpStatus.OK);
			}catch(IllegalArgumentException exception) {
				return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
			}
		}else {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
	}
}
