package com.example.backend.service;

import com.example.backend.model.Comment;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CommentServiceImpl implements CommentService {
    @Override
    public List<Comment> getProductComments(Integer idProduct) {
        return null;
    }

    @Override
    public void addComment(Integer idProduct) {

    }

    @Override
    public void deleteComment(Integer idComment) {

    }
}
