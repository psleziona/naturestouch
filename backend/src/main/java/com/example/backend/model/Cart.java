package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCart;
    @OneToMany(mappedBy = "cart")
    @JsonIgnoreProperties({"cart","order"})
    private List<QuantityProduct> products;
    public Cart() {
        products = new ArrayList<>();
    }
}
