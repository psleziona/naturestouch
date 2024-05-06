package com.example.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity(name = "orders")
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOrder;
    private LocalDateTime dateTime;
    private OrderStatus status;
    @ManyToOne
    @JoinColumn(name = "id_user")
    @JsonIgnore
    private User buyer;
    @OneToMany(mappedBy = "order")
    @JsonIgnoreProperties({"cart", "order"})
    private List<QuantityProduct> products;


}
