package com.example.backend.service;

import com.example.backend.auth.AuthService;
import com.example.backend.model.Product;
import com.example.backend.model.ProductPriceHistory;
import com.example.backend.model.QuantityProduct;
import com.example.backend.model.User;
import com.example.backend.repository.ProductPriceHistoryRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.QuantityProductRepository;
import com.example.backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductRepository productRepository;
    private final AuthService authService;
    private final UserRepository userRepository;
    private final ProductPriceHistoryRepository productPriceHistoryRepository;
    private final QuantityProductRepository quantityProductRepository;
    @Override
    public Optional<Product> getProduct(Integer idProduct) {
        return productRepository.findById(idProduct);
    }

    @Override
    public List<Product> getProducts() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getLastProducts() {
        return productRepository.findAll()
                .stream().filter(p -> p.getQuantity() <= 10)
                .limit(4)
                .toList();
    }

    @Override
    public List<Product> getHotProducts() {
        return quantityProductRepository.findAll()
                .stream().filter(qp -> qp.getOrder() != null)
                .collect(Collectors.groupingBy(QuantityProduct::getProduct, Collectors.summarizingInt(QuantityProduct::getQuantity)))
                .entrySet()
                .stream()
                .sorted((o1, o2) -> {
                    if(o1.getValue().getSum() > o2.getValue().getSum())
                        return 1;
                    else return -1;
                })
                .limit(4)
                .map(Map.Entry::getKey)
                .toList();

    }

    @Override
    public Set<Product> getObservedProducts() {
        User currentUser = authService.getSessionUser();
        return currentUser.getObserved();
    }

    @Override
    public void addProduct(Product product) {
        Product createdProduct = productRepository.save(product);
        ProductPriceHistory pph = new ProductPriceHistory(product, product.getPrice());
        pph.setProduct(createdProduct);
        productPriceHistoryRepository.save(pph);
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
    public void deleteProductFromObserved(Integer idProduct) {
        productRepository.findById(idProduct)
                .ifPresent(p -> {
                    User currentUser = authService.getSessionUser();
                    List<User> followers = p.getFollowers();
                    followers.remove(currentUser);
                    p.setFollowers(followers);
                    Set<Product> observed = currentUser.getObserved();
                    var filtered = observed.stream().filter(product -> !Objects.equals(product.getIdProduct(), idProduct)).collect(Collectors.toSet());
                    currentUser.setObserved(filtered);
                    productRepository.save(p);
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
