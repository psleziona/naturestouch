package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

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
    @OneToMany(mappedBy = "buyer")
    private List<Order> orders;
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JoinTable(
            name = "observed_products",
            joinColumns = @JoinColumn(name = "id_user"),
            inverseJoinColumns = @JoinColumn(name = "id_product"))
    private Set<Product> observed;

}
