package recipes.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("ratings")
public class Rating {
    @Id
    private String id;
    private String userId;
    private String recipeId;
    private int rating;
    
    public int getRating() {
    	return rating;
    }
    
    public String getRecipeId() {
    	return recipeId;
    }
}