package recipes.controller;

import org.apache.tomcat.util.net.openssl.ciphers.Authentication;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.domain.AuthResponse;
import recipes.domain.User;
import recipes.repository.UserRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/users*")
public class UserController {
    @Autowired
    private UserRepository repository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<User> getUsers() {
        return repository.findAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUser(@PathVariable String id){
        try{
            Optional<User> user = repository.findById(id);
            return user.map(value -> ResponseEntity.ok().body(value)).orElseGet(() -> ResponseEntity.notFound().build());
        }
        catch(Exception exception){
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public void addUser(@RequestBody User user){
        if (repository.findByUsername(user.getUsername()).isPresent()){
            throw new IllegalArgumentException("User already exists");
           // return ResponseEntity.ok().body(new AuthResponse<>(user, true, "Account with the given username already exists"));
        }
        if (repository.findByEmail(user.getEmail()).isPresent()) {
          //  return ResponseEntity.ok().body(new AuthResponse<>(user, true, "Account with the given email already exists"));
        }
        repository.save(user);
        //return ResponseEntity.ok().body(new AuthResponse<>(user));

    }
    
    @RequestMapping(value="/update", method = RequestMethod.PUT)
    public ResponseEntity<Boolean> updateUser(@RequestBody User user) {
    	
    	if(user.getId() == null || user.getId().trim().isEmpty()) {
    		return ResponseEntity.badRequest().build();
    	}
    	
    	Optional<User> dbUserOpt = this.repository.findById(user.getId());
    	
    	if(!dbUserOpt.isPresent()) {
    		return ResponseEntity.notFound().build();
    	}
    	
    	User dbUser = dbUserOpt.get();
    	dbUser.setFirstName(user.getFirstName());
    	dbUser.setLastName(user.getLastName());
    	dbUser.setEmail(user.getEmail());
    	
    	this.repository.save(dbUser);
    	
    	return ResponseEntity.ok(true);
    }

    // Used for the login page.
    @RequestMapping(value = "/check", method = RequestMethod.POST)
    public ResponseEntity<AuthResponse<User>> checkUser(@RequestBody User user){
        Optional<User> localUser = repository.findByUsername(user.getUsername());
        if(localUser.isPresent() && localUser.get().getPassword().matches(user.getPassword())){

            return ResponseEntity.ok().body(new AuthResponse<>(localUser.get()));
        }
        return ResponseEntity.ok().body(new AuthResponse<>(user, true, "Account doesn't exist"));
        //return null;
    }
    
    //Method for getting a user type object based on id for the ComplexRecipe object type
    //input id of target user(author) -> output User object if it existis in db or NULL ohterwise
    public User getAuthor (String entityId) {
		Optional<User> author= repository.findById(entityId);
		if(author.isPresent())return author.get();
		else return null;
	}

//    @RequestMapping(value = "myUser", method = RequestMethod.GET)
//    public User getUserLoggedIn() {
//
//    }

}
