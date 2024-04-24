package com.example.backend.service;

import com.example.backend.auth.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final AuthService authService;
    private final CartService cartService;
    @Override
    public void addProduct(Integer idProduct) {

    }

    @Override
    public void deleteProduct(Integer idProduct) {

    }

    @Override
    public void clearCart() {

    }
}
