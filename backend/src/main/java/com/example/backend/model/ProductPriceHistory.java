package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@Entity
public class ProductPriceHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProductPriceHistory;
    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;
    private LocalDate date;
    private Double price;

    public ProductPriceHistory(Product product, Double price) {
        this.product = product;
        this.price = price;
        this.date = LocalDate.now();
    }
}
