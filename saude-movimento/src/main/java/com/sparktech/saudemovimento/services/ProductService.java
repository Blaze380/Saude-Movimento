package com.sparktech.saudemovimento.services;

import org.springframework.stereotype.Service;

import com.sparktech.saudemovimento.models.ProductModel;
import com.sparktech.saudemovimento.repositories.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;

    public void saveProduct(ProductModel productModel) {
        productRepository.save(productModel);

    }
}
