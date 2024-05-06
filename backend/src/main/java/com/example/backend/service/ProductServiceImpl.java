package com.example.backend.service;

import com.example.backend.auth.AuthService;
import com.example.backend.model.Product;
import com.example.backend.model.ProductPriceHistory;
import com.example.backend.model.User;
import com.example.backend.repository.ProductPriceHistoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final ProductPriceHistoryRepository productPriceHistoryRepository;
    @Override
    public Optional<Product> getProduct(Integer idProduct) {
        return productRepository.findById(idProduct);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getObservedProducts() {
        User currentUser = authService.getSessionUser();
        return currentUser.getObserved();
    }

    @Override
    public void addProduct(Product product) {
        productRepository.save(product);
    }

    @Override
    public void addProductToObserved(Integer idProduct) {
        User currentUser = authService.getSessionUser();
        productRepository.findById(idProduct)
                .ifPresent(p -> {
                    p.getFollowers().add(currentUser);
                    currentUser.getObserved().add(p);
                    productRepository.save(p);
                    userRepository.save(currentUser);
                });
    }

    @Override
    public void changePrice(Integer idProduct, Double price) {
        productRepository.findById(idProduct)
                .ifPresent(p -> {
                    p.setPrice(price);
                    ProductPriceHistory priceHistory = new ProductPriceHistory(p, price);
                    priceHistory.setProduct(p);
                    productPriceHistoryRepository.save(priceHistory);
                    productRepository.save(p);
                });
    }

    @Override
    public void deleteProduct(Integer idProduct) {
        productRepository.deleteProductByIdProduct(idProduct);
    }

    @Override
    public void increaseProductQuantity(Integer idProduct, Integer quantity) {
        productRepository.findById(idProduct)
                .ifPresent(p -> {
                    p.setQuantity(p.getQuantity() + quantity);
                    productRepository.save(p);
                });
    }

    @Override
    public void decreaseProductQuantity(Integer idProduct, Integer quantity) {
        productRepository.findById(idProduct)
                .ifPresent(p -> {
                    p.setQuantity(p.getQuantity() - quantity);
                    productRepository.save(p);
                });
    }
}
