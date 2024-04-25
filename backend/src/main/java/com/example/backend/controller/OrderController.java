package com.example.backend.controller;

import com.example.backend.model.Order;
import com.example.backend.model.OrderStatus;
import com.example.backend.service.OrderService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/orders")
    List<Order> getOrders() {
        return orderService.getOrders();
    }

    @PostMapping("/orders")
    ResponseEntity<Void> createOrder() {
        orderService.addOrder();
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/orders/{idOrder}")
    ResponseEntity<Order> getOrder(@PathVariable Integer idOrder) {
        return ResponseEntity.of(orderService.getOrder(idOrder));
    }

    @PutMapping("/orders/cancel/{idOrder}")
    ResponseEntity<Void> cancelOrder(@PathVariable Integer idOrder) {
        orderService.changeOrderStatus(idOrder, OrderStatus.CANCELED);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
