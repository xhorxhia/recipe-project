package recipes.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import recipes.domain.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUsername(String username);
    // The reason as to why this works is due to Spring Data's auto-generated queries.
    // https://www.baeldung.com/spring-data-repositories
    // https://stackoverflow.com/questions/46778406/auto-generated-spring-data-query-for-mongodb-x-most-recent-entries
    // https://docs.spring.io/spring-data/mongodb/docs/current/reference/html/#repository-query-return-types

    Optional<User> findByEmail(String email);
    Optional<User> findById(String id);
}
