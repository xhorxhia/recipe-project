package recipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.domain.Image;
import recipes.repository.ImageRepository;

import java.util.Optional;

@RestController
@RequestMapping(path = "/images*")
public class ImageController {
    @Autowired
    private ImageRepository repository;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Image> getImage(@PathVariable String id){
        try{
            Optional<Image> image = repository.findById(id);
            if(image.isPresent()){
                return ResponseEntity.ok().body(image.get());
            }
            else{
                return ResponseEntity.notFound().build();
            }
        }
        catch(Exception exception){
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Image> addImage(@RequestParam("uploadedFileName") String fileName, @RequestParam("uploadedFileType") String fileType, @RequestParam("uploadedFileContent") String fileContent){
        try{
            Image image = new Image(fileName, fileType, fileContent);
            repository.save(image);
            return ResponseEntity.ok().body(image);
        } catch (NullPointerException e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity deleteImage(@PathVariable String id){
        try{
            repository.deleteById(id);
            return ResponseEntity.ok().build();
        }
        catch(Exception exception){
            return ResponseEntity.badRequest().build();
        }
    }
}
