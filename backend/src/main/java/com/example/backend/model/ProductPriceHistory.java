package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    @JsonIgnoreProperties({"comments","priceHistories"})
    private Product product;
    private LocalDate date;
    private Double price;

    public ProductPriceHistory(Product product, Double price) {
        this.product = product;
        this.price = price;
        this.date = LocalDate.now();
    }
}
