package recipes.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import recipes.domain.Comment;
@Repository
public interface CommentRepository extends MongoRepository<Comment, String>{
}
