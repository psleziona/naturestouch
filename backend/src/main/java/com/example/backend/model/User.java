package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity(name = "users")
@NoArgsConstructor(force = true)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idUser;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String street;
    private String houseNumber;
    private String city;
    private String zipcode;
    private Role role;
    @OneToOne
    @JoinColumn(name = "id_cart")
    private Cart cart;
    @OneToMany(mappedBy = "order")
    private List<Order> orders;
}
