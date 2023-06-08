package recipes.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import recipes.domain.Comment;
import recipes.repository.CommentRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping(value = "/comments*")
public class CommentController {
    @Autowired
    private CommentRepository repository;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public List<Comment> getComments() {
        return repository.findAll();
    }

    @GetMapping("/root-nodes")
    public List<String> getRootNodes() {
        List<Comment> comments = repository.findAll();
        List<String> rootNodes = new ArrayList<>();
        for (Comment comment : comments ) {
            if (Objects.equals(comment.getParentId(), "0")) {
                rootNodes.add(comment.getId());
            }
        }
        System.out.println("root nodes are: "+rootNodes);
        return rootNodes;
    }

    @GetMapping("/children/{id}")
    public List<String> getChildren(@PathVariable String id) {
        List<Comment> comments = repository.findAll();
        List<String> children = new ArrayList<>();
        for (Comment comment : comments ) {
            if (Objects.equals(comment.getParentId(), id)) {
                children.add(comment.getId());
            }
        }
        System.out.println("children for" + id + "are: "+children);
        return children;
    }

    @PostMapping("/comments")
    public void addNewComment(@RequestBody Comment comment) {
        repository.save(comment);
    }
}
