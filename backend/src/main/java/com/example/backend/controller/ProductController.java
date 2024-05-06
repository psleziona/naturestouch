package com.example.backend.controller;

import com.example.backend.model.Product;
import com.example.backend.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class ProductController {
    private final ProductService productService;
    @GetMapping("/products/{idProduct}")
    ResponseEntity<Product> getProduct(@PathVariable Integer idProduct) {
        return ResponseEntity.of(productService.getProduct(idProduct));
    }

    @GetMapping("/products")
    List<Product> getProducts() {
        return productService.getProducts();
    }

    @GetMapping("/products/observed")
    List<Product> getObserved() {
        return productService.getObservedProducts();
    }

    @PostMapping("/products/observed/{idProduct}")
    ResponseEntity<Void> addToObserved(@PathVariable Integer idProduct) {
        productService.addProductToObserved(idProduct);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

    @PostMapping("/products")
    ResponseEntity<Void> addProduct(@RequestBody Product product) {
        productService.addProduct(product);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/products/price/{idProduct}/{price}")
    ResponseEntity<Void> changePrice(@PathVariable Integer idProduct, @PathVariable Double price) {
        productService.changePrice(idProduct, price);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/products/{idProduct}/{quantity}")
    ResponseEntity<Void> addProductQuantity(@PathVariable Integer idProduct, @PathVariable Integer quantity) {
        productService.increaseProductQuantity(idProduct, quantity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/products/{idProduct}")
    ResponseEntity<Void> deleteProduct(@PathVariable Integer idProduct) {
        productService.deleteProduct(idProduct);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
