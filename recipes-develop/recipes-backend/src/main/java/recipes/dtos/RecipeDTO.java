package recipes.dtos;

import lombok.*;
import recipes.domain.Ingredients;
import recipes.domain.Recipe;
import recipes.domain.User;

import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecipeDTO {
    private String id;
    private String name;
    private String description;
    private List<Ingredients> ingredients;
	private List<String> steps;
	private String category;
    private User author;
    private String date;
    private String imagePath;
    private float stars;
	private String recipeDifficulty;
//	private String fileName;
//	private String contentType;
//
//	public String getFileName() {
//		return fileName;
//	}
//
//	public void setFileName(String fileName) {
//		this.fileName = fileName;
//	}
//
//	public String getContentType() {
//		return contentType;
//	}
//
//	public void setContentType(String contentType) {
//		this.contentType = contentType;
//	}

	private enum difficulty{
    	Easy,
    	Medium,
    	Advanced,
    	Unrated
    }
	//difficulty recipeDifficulty;
    
//	 public RecipeDTO(String id, String name, String description,String ingredients, List<String> steps, String category, String author, String date, String imagePath,float stars,String dif) {
//			this.id = id;
//			this.name = name;
//			this.description = description;
//			this.ingredients = ingredients;
//			this.steps = steps;
//			this.category = category;
//			this.author = author;
//			this.date = date;
//			this.stars = stars;
//			this.imagePath = imagePath;
//
//			switch(dif){
//				case "Easy":
//					this.recipeDifficulty= difficulty.Easy;
//					break;
//
//				case "Medium":
//					this.recipeDifficulty= difficulty.Medium;
//					break;
//
//				case "Advanced":
//					this.recipeDifficulty= difficulty.Advanced;
//					break;
//
//				default:
//					this.recipeDifficulty= difficulty.Unrated;
//					break;
//			}
//	}
	

	 public RecipeDTO(Recipe res) {
		 this(	res.getId(),
				res.getName(),
				res.getDescription(),
				res.getIngredients(),
				res.getSteps(),
				res.getCategory(),
				res.getAuthor(),
				res.getDate(),
				res.getImagePath(),
				0,
				res.getDifficulty() == null || res.getDifficulty() == "" ? "Unrated" : res.getDifficulty()
//				 res.getFileName(),
//				 res.getContentType()
			);
	 }


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public List<Ingredients> getIngredients() {
		return ingredients;
	}


	public void setIngredients(List<Ingredients> ingredients) {
		this.ingredients = ingredients;
	}


	public List<String> getSteps() {
		return steps;
	}


	public void setSteps(List<String> steps) {
		this.steps = steps;
	}


	public String getCategory() {
		return category;
	}


	public void setCategory(String category) {
		this.category = category;
	}
//
//	public String getDif() {
//		return dif;
//	}
//
//	public void setDif(String dif) {
//		this.dif = dif;
//	}

	public User getAuthor() {
		return author;
	}


	public void setAuthor(User author) {
		this.author = author;
	}


	public String getDate() {
		return date;
	}


	public void setDate(String date) {
		this.date = date;
	}


	public String getImagePath() {
		return imagePath;
	}


	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}


	public float getStars() {
		return stars;
	}


	public void setStars(float stars) {
		this.stars = stars;
	}


	public String getRecipeDifficulty() {
		return recipeDifficulty;
	}


	public void setRecipeDifficulty(String recipeDifficulty) {
		this.recipeDifficulty = recipeDifficulty;
	}
	 
	 
}