package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idProduct;
    @NotNull
    private String name;
    @NotNull
    private Double price;
    @NotNull
    private Integer quantity;
    @OneToMany(mappedBy = "product")
    private List<Comment> comments;
    @NotNull
    private ProductCategory category;
    @NotNull
    private String ingredients;
    @NotNull
    private String filename;
    @OneToMany(mappedBy = "product")
    private List<ProductPriceHistory> priceHistories;
    @ManyToMany(mappedBy = "observed")
    private List<User> followers;
}
