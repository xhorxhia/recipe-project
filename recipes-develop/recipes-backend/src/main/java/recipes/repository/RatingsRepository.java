package recipes.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import recipes.domain.Rating;

public interface RatingsRepository extends MongoRepository<Rating, String>{
}
