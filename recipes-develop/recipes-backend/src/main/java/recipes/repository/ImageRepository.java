package recipes.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import recipes.domain.Image;

public interface ImageRepository extends MongoRepository<Image, String> {
}
