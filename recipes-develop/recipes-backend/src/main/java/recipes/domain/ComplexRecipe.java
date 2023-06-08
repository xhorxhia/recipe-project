package recipes.domain;

import lombok.*;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document("recipes")
@Deprecated
public class ComplexRecipe {
    @Id
    private String id;
    private String name;
    private String description;
    private List<String> ingredients;
	private List<String> steps;
	private String category;
    private User author;
    private String date;
    private String imagePath;
    private float stars;
	private enum difficulty{
    	Easy,
    	Medium,
    	Advanced,
    	Unrated
    }
	difficulty recipeDifficulty;
    
	 public ComplexRecipe(String id, String name, String description, User author, String dif, float stars) {
			this.id = id;
			this.name = name;
			this.description = description;
			this.author = author;
			this.stars = stars;
			
			switch(dif){
				case "Easy":
					this.recipeDifficulty= difficulty.Easy;
					break;
					
				case "Medium":
					this.recipeDifficulty= difficulty.Medium;
					break;
					
				case "Advanced":
					this.recipeDifficulty= difficulty.Advanced;
					break;
					
				default:
					this.recipeDifficulty= difficulty.Unrated;
					break;
			}
	}
	 
	 public ComplexRecipe(Recipe res) {
		 this(res.getId(), res.getName(), res.getDescription(), null, res.getDifficulty(), 0);
		 
	 }
}