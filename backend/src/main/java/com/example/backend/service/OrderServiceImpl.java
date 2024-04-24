package com.example.backend.service;

import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OrderServiceImpl implements OrderService {
    @Override
    public void addOrder() {

    }

    @Override
    public Optional<Order> getOrder(Integer idOrder) {
        return Optional.empty();
    }

    @Override
    public List<Order> getOrders() {
        return null;
    }

    @Override
    public void changeOrderStatus(Integer idOrder, OrderStatus status) {

    }
}
