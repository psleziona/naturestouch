package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.lang.NonNull;

import java.time.LocalDate;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
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
    @NotNull
    private Double lowestPriceInLast30Days;
    @NotNull
    private LocalDate dateOfLowestPrice;
    @OneToMany(mappedBy = "product")
    private List<Comment> comments;
}
