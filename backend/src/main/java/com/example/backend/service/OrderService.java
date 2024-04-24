package com.example.backend.service;

import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    void addOrder();
    Optional<Order> getOrder(Integer idOrder);
    List<Order> getOrders();
    void changeOrderStatus(Integer idOrder, OrderStatus status);
}
