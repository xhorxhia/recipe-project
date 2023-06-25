package recipes.services;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;
import recipes.domain.AvgRating;
import recipes.dtos.RecipeDTO;
import recipes.repository.RecipeRepository;

@Service
public class RecipeService {	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@Autowired
	private RecipeRepository recipeRepository;

		
	public List<RecipeDTO> getAllRecipes(){
		List<RecipeDTO> recipes =  this.recipeRepository
				.findAll()
				.stream()
				.map(RecipeDTO::new)
				.collect(Collectors.toList());
		
		Map<String, Float> ratings = this.getAvgRatings()
				.stream()
				.collect(Collectors.toMap(AvgRating::get_id, AvgRating::getRating));
		
		for(RecipeDTO res : recipes){
			if(ratings.containsKey(res.getId())) {
				res.setStars(ratings.get(res.getId()));
			}		
		}
		
		return recipes;
	}
	
	
	public List<AvgRating> getAvgRatings(){
		Aggregation agg = Aggregation.newAggregation(Aggregation.group("recipeId").avg("rating").as("rating"));
		AggregationResults<AvgRating> results = mongoTemplate.aggregate(agg, "ratings", AvgRating.class);
		
		return results.getMappedResults();
	}
}
