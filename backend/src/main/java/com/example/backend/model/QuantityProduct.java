package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
public class QuantityProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCartProduct;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    @NotNull
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "id_cart")
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "id_order")
    private Order order;

    public QuantityProduct(Product p) {
        this.product = p;
        this.quantity = 1;
    }

    public QuantityProduct(Product p, Integer quantity) {
        this.product = p;
        this.quantity = quantity;
    }

    public void increaseQuantity() {
        quantity++;
    }

    public void decreaseQuantity() {
        quantity--;
    }
}
