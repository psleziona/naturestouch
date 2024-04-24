package com.example.backend.service;

import com.example.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface ProductService {
    Optional<Product> getProduct(Integer idProduct);
    List<Product> getProducts();
    void addProduct(Product product);
    void deleteProduct(Integer idProduct);
}
