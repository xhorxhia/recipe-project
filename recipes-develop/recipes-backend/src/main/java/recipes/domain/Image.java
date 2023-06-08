package recipes.domain;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@AllArgsConstructor
@Document("images")
public class Image {
    
	@Id
    private String id;
    @NonNull
    private String name;
    @NonNull
    private String type;
    @NonNull
    private String content;
    
    public Image(@NonNull String name, @NonNull String type, @NonNull String content) {
		super();
		this.name = name;
		this.type = type;
		this.content = content;
	}
}
