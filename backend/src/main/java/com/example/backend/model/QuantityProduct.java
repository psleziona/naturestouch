package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"quantity", "comments", " category", "ingredients", "priceHistories", "category", "followers"})
    private Product product;
    @NotNull
    private Integer quantity;
    @ManyToOne
    @JoinColumn(name = "id_cart")
    @JsonIgnore
    private Cart cart;
    @ManyToOne
    @JoinColumn(name = "id_order")
    @JsonIgnore
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
