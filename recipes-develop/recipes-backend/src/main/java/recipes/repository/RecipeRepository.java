package recipes.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.mongodb.DBRef;

import recipes.domain.Recipe;
import recipes.domain.User;

public interface RecipeRepository extends MongoRepository<Recipe, String>{

//	List<Recipe> findByAuthor(DBRef author);
List<Recipe> findByAuthor(User author);

	Recipe findRecipeById(String id);
}
