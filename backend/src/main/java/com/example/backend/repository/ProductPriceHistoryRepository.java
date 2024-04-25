package com.example.backend.repository;

import com.example.backend.model.ProductPriceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductPriceHistoryRepository extends JpaRepository<ProductPriceHistory, Integer> {
}
