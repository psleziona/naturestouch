package com.example.backend.repository;

import com.example.backend.model.QuantityProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuantityProductRepository extends JpaRepository<QuantityProduct, Integer> {
}
