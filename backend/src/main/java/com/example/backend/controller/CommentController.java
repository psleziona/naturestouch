package com.example.backend.controller;

import com.example.backend.model.Comment;
import com.example.backend.service.CommentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class CommentController {
    private final CommentService commentService;
    @PostMapping("/comment/add/{idProduct}")
    ResponseEntity<Void> addComment(@PathVariable Integer idProduct, @RequestBody Comment comment) {
        commentService.addComment(comment, idProduct);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/comment/delete/{idComment}")
    ResponseEntity<Void> deleteComment(@PathVariable Integer idComment) {
        commentService.deleteComment(idComment);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
