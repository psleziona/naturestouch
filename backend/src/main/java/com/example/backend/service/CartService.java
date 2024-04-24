package com.example.backend.service;

import com.example.backend.model.Cart;

import java.util.Optional;

public interface CartService {
    void addProduct(Integer idProduct);
    void deleteProduct(Integer idProduct);
    void clearCart();
}
