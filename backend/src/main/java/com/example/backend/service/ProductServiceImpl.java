package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    @Override
    public Optional<Product> getProduct(Integer idProduct) {
        return productRepository.findById(idProduct);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void deleteProduct(Integer idProduct) {
        productRepository.deleteProductByIdProduct(idProduct);
    }
}
