package recipes.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AvgRating {
	private String _id;
	private float rating;
	
	public String get_id() {
		return _id;
	}
	public float getRating() {
		return rating;
	}
}
