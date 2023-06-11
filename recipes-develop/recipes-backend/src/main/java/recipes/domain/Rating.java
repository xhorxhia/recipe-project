package recipes.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@Document("ratings")
public class Rating {
//    @Id
//    private String id;
    private String userId;
    private String recipeId;
    private Float stars;
    


}