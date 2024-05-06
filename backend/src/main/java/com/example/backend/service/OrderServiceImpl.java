package com.example.backend.service;

import com.example.backend.auth.AuthService;
import com.example.backend.model.Cart;
import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;
import com.example.backend.model.User;
import com.example.backend.repository.OrderRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final AuthService authService;
    private final ProductService productService;
    private final CartService cartService;
    @Override
    public void addOrder() {
        Order o = new Order();
        Cart userCart = authService.getSessionUser().getCart();
        userCart.getProducts().forEach(quantityProduct -> {
            o.getProducts().add(quantityProduct);
            productService.decreaseProductQuantity(quantityProduct.getProduct().getIdProduct(), quantityProduct.getQuantity());
        });
        cartService.clearCart();
        orderRepository.save(o);
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
                    orderRepository.save(o);
                });
    }
}
