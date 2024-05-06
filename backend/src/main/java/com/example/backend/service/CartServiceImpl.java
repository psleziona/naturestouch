package com.example.backend.service;

import com.example.backend.auth.AuthService;
import com.example.backend.model.Cart;
import com.example.backend.model.Product;
import com.example.backend.model.QuantityProduct;
import com.example.backend.model.User;
import com.example.backend.repository.CartRepository;
import com.example.backend.repository.QuantityProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {
    private final AuthService authService;
    private final ProductService productService;
    private final CartRepository cartRepository;
    private final QuantityProductRepository quantityProductRepository;

    @Override
    public Cart getCart() {
        User currentUser = authService.getSessionUser();
        var c = currentUser.getCart();
        return currentUser.getCart();
    }

    @Override
    public void addProduct(Integer idProduct) {
        User currentUser = authService.getSessionUser();
        Cart cart = currentUser.getCart();
        productService.getProduct(idProduct)
                .ifPresent(p -> {
                    List<Product> productsInCart = cart.getProducts().stream().map(QuantityProduct::getProduct).toList();
                    if(productsInCart.contains(p))
                        cart.getProducts().stream()
                                .filter(quantityProduct -> quantityProduct.getProduct().getIdProduct().equals(idProduct))
                                .forEach(QuantityProduct::increaseQuantity);
                    else {
                        QuantityProduct qp = new QuantityProduct(p);
                        qp.setCart(cart);
                        quantityProductRepository.save(qp);
                    }
                });
        cartRepository.save(cart);
    }

    @Override
    public void deleteProduct(Integer idProduct) {
        User currentUser = authService.getSessionUser();
        Cart cart = currentUser.getCart();
        productService.getProduct(idProduct)
                .ifPresent(p -> {
                    cart.getProducts().stream()
                            .filter(quantityProduct -> quantityProduct.getProduct().getIdProduct().equals(idProduct))
                            .forEach(quantityProduct -> {
                                quantityProduct.decreaseQuantity();
                                if(quantityProduct.getQuantity().equals(0)) {
                                    quantityProductRepository.delete(quantityProduct);
                                }
                            });
                });
        cartRepository.save(cart);
    }

    @Override
    public void setProductQuantity(Integer idProduct, Integer quantity) {
        User currentUser = authService.getSessionUser();
        Cart cart = currentUser.getCart();
        productService.getProduct(idProduct)
                .ifPresent(p -> {
                    List<Product> productsInCart = cart.getProducts().stream().map(QuantityProduct::getProduct).toList();
                    if(productsInCart.contains(p))
                        cart.getProducts().stream()
                                .filter(quantityProduct -> quantityProduct.getProduct().getIdProduct().equals(idProduct))
                                .forEach(quantityProduct -> {
                                    if(quantity == 0)
                                        quantityProductRepository.delete(quantityProduct);
                                    else
                                        quantityProduct.setQuantity(quantity);
                                });
                    else {
                        QuantityProduct qp = new QuantityProduct(p, quantity);
                        qp.setCart(cart);
                        quantityProductRepository.save(qp);
                    }
                });
        cartRepository.save(cart);
    }

    @Override
    public void clearCart() {
        User currentUser = authService.getSessionUser();
        Cart cart = currentUser.getCart();
        cart.setProducts(new ArrayList<>());
        cartRepository.save(cart);
    }
}
