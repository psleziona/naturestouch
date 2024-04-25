package com.example.backend.controller;

import com.example.backend.model.Cart;
import com.example.backend.service.CartService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class CartController {
    private final CartService cartService;

    @GetMapping("/cart")
    ResponseEntity<Cart> getUserCart() {
        return ResponseEntity.of(Optional.of(cartService.getCart()));
    }

    @PostMapping("/cart/add/{idProduct}")
    ResponseEntity<Void> addProductToCart(@PathVariable Integer idProduct) {
        cartService.addProduct(idProduct);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/cart/delete/{idProduct}")
    ResponseEntity<Void> deleteProductFromCart(@PathVariable Integer idProduct) {
        cartService.deleteProduct(idProduct);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/cart/set/{idProduct}/{quantity}")
    ResponseEntity<Void> deleteProductFromCart(@PathVariable Integer idProduct, @PathVariable Integer quantity) {
        cartService.setProductQuantity(idProduct, quantity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/cart/clear")
    ResponseEntity<Void> clearCart() {
        cartService.clearCart();
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
