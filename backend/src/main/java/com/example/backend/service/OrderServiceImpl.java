package com.example.backend.service;

import com.example.backend.auth.AuthService;
import com.example.backend.model.*;
import com.example.backend.repository.OrderRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.QuantityProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final AuthService authService;
    private final QuantityProductRepository quantityProductRepository;
    private final ProductRepository productRepository;
    @Override
    public void addOrder() {
        Order o = new Order();
        o.setProducts(new ArrayList<>());
        o.setBuyer(authService.getSessionUser());
        o.setDateTime(LocalDateTime.now());
        o.setStatus(OrderStatus.UNPAID);
        var createdOrder = orderRepository.save(o);
        Cart userCart = authService.getSessionUser().getCart();
        userCart.getProducts().forEach(quantityProduct -> {
            Product p = quantityProduct.getProduct();
            p.decreaseQuantity(quantityProduct.getQuantity());
            productRepository.save(p);
            quantityProduct.setOrder(createdOrder);
            quantityProduct.setCart(null);
            quantityProductRepository.save(quantityProduct);
        });
    }

    @Override
    public Optional<Order> getOrder(Integer idOrder) {
        return orderRepository.findById(idOrder);
    }


    @Override
    public List<Order> getOrders() {
        User currentUser = authService.getSessionUser();
        return currentUser.getOrders();
    }

    @Override
    public void changeOrderStatus(Integer idOrder, OrderStatus status) {
        orderRepository.findById(idOrder)
                .ifPresent(o -> {
                    o.setStatus(status);
                    if(status.equals(OrderStatus.CANCELED)) {
                        o.getProducts().forEach(quantityProduct -> {
                            Product p = quantityProduct.getProduct();
                            Integer quantity = p.getQuantity();
                            p.setQuantity(quantity + quantityProduct.getQuantity());
                            productRepository.save(p);
                        });
                    }
                    orderRepository.save(o);
                });
    }
}
