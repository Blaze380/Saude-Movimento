package com.sparktech.saudemovimento.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sparktech.saudemovimento.models.ProductModel;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {
    List<ProductModel> findByProductCategory(String categoryName);
}
