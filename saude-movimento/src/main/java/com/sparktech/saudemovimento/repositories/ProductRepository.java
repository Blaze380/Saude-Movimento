package com.sparktech.saudemovimento.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sparktech.saudemovimento.models.ProductModel;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

}
