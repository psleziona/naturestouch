package com.example.backend.service;

import com.example.backend.model.Comment;

import java.util.List;

public interface CommentService {
    void addComment(Comment comment,Integer idProduct);
    void deleteComment(Integer idComment);
}
