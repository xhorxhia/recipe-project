package recipes.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.util.*;

import com.mongodb.client.gridfs.model.GridFSFile;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Example;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;
import com.mongodb.DBRef;
import org.springframework.web.multipart.MultipartFile;
import recipes.config.ApiException;
import recipes.domain.Rating;
import recipes.domain.Recipe;
import recipes.domain.User;
import recipes.dtos.RecipeDTO;
import recipes.repository.RatingsRepository;
import recipes.repository.RecipeRepository;
import recipes.repository.UserRepository;
import recipes.services.FileServiceImplementation;
import recipes.services.RecipeService;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.swing.text.Utilities;

@CrossOrigin(origins = "http://localhost:4200")
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

	@Autowired
	private FileServiceImplementation fileServiceImplementation;

	@Autowired
	private GridFsTemplate gridFsTemplate;

	@GetMapping
	public ResponseEntity<List<Recipe>> findAll(){
//		return new ResponseEntity<>(this.recipeService.getAllRecipes(), HttpStatus.OK);
		List<Recipe> recipes = recipeRepository.findAll();
//		List<Recipe> recipes =new ArrayList<>();
//		recipeRepository.findAll()
//		.forEach(recipe -> {
//			GridFSFile imageFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(recipe.getFileName())));
//			InputStream inputStream = null;
//			try {
//				inputStream = gridFsTemplate.getResource(imageFile).getInputStream();
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			byte[] imageBytes = new byte[0];
//			try {
//				imageBytes = StreamUtils.copyToByteArray(inputStream);
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			String base64Image = Base64.getEncoder().encodeToString(imageBytes);
//
//			recipe.setImagePath(base64Image);
//			recipes.add(recipe);
//		});
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
	public ResponseEntity<RecipeDTO> addRecipe(@RequestBody RecipeDTO recipeDto) {  //@RequestPart(value = "file") MultipartFile file,
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

//		if(file != null){
//			recipe.setImagePath(recipeDto.getImagePath());
//			recipe.setFileName(fileServiceImplementation.save(file.getInputStream(), file.getOriginalFilename(), file.getContentType()));
//		}


//		GridFSFile imageFile = gridFsTemplate.findOne(new Query(Criteria.where("_id").is(recipe.getFileName())));
//		InputStream inputStream = null;
//		try {
//			inputStream = gridFsTemplate.getResource(imageFile).getInputStream();
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		byte[] imageBytes = new byte[0];
//		try {
//			imageBytes = StreamUtils.copyToByteArray(inputStream);
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//		String base64Image = Base64.getEncoder().encodeToString(imageBytes);
//
//		recipe.setImagePath(base64Image);
		
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
	public ResponseEntity<List<Recipe>> getRecipesByAuthor(@PathVariable String authorId){
		try {
		//DBRef authorDBRef = new DBRef("users", authorId);
		User user  = userRepository.findById(authorId).get();
//		List<RecipeDTO> recipesDTO = new ArrayList<>();
		List<Recipe> recipes = this.recipeRepository.findByAuthor(user);
//		recipes.forEach(recipe -> {
//			RecipeDTO recipedto = new RecipeDTO(recipe);
//			this.recipeService.getAvgRatings().forEach(avgRating -> {
//				if (avgRating.get_id().equals(String.valueOf(recipe.getId()))) {
//					recipedto.setStars((long) avgRating.getRating());
//				}
//			});
//			recipesDTO.add(recipedto);
//		});
		return new ResponseEntity<>(recipes , HttpStatus.OK);
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
