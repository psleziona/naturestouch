package com.example.backend.service;

import com.example.backend.model.Comment;
import com.example.backend.repository.CommentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ProductService productService;

    @Override
    public void addComment(Comment comment, Integer idProduct) {
        productService.getProduct(idProduct)
                .ifPresent(p ->{
                    p.getComments().add(comment);
                    commentRepository.save(comment);
                });
    }

    @Override
    public void deleteComment(Integer idComment) {
        commentRepository.deleteById(idComment);
    }
}
