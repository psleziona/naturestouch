package com.example.backend.service;

import com.example.backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ProductService {
    Optional<Product> getProduct(Integer idProduct);
    List<Product> getProducts();
    List<Product> getLastProducts();
    List<Product> getHotProducts();
    Set<Product> getObservedProducts();
    void addProduct(Product product);
    void addProductToObserved(Integer idProduct);
    void deleteProductFromObserved(Integer idProduct);
    void deleteProduct(Integer idProduct);
    void increaseProductQuantity(Integer idProduct, Integer quantity);
    void decreaseProductQuantity(Integer idProduct, Integer quantity);
    void changePrice(Integer idProduct, Double price);
}
