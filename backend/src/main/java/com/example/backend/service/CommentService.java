package com.example.backend.service;

import com.example.backend.model.Comment;

import java.util.List;

public interface CommentService {
    List<Comment> getProductComments(Integer idProduct);
    void addComment(Integer idProduct);
    void deleteComment(Integer idComment);
}
