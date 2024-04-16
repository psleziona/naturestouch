package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idOrder;
    private LocalDateTime dateTime;
    private boolean isPaid;
    @ManyToOne
    @JoinColumn(name = "id_user")
    private User buyer;
    @OneToMany(mappedBy = "order")
    private List<QuantityProduct> products;


}
