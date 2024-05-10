package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCart;
    @OneToMany(mappedBy = "cart")
    @JsonIgnoreProperties({"order", "cart"})
    private List<QuantityProduct> products;
    public Cart() {
        products = new ArrayList<>();
    }
}
