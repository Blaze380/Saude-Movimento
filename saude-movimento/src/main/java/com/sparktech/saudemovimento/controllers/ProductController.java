package com.sparktech.saudemovimento.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sparktech.saudemovimento.models.ProductModel;
import com.sparktech.saudemovimento.services.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/images")
@AllArgsConstructor
public class ProductController {
    ProductService productService;

    @PostMapping()
    public ResponseEntity<?> saveProduct(@RequestParam("id") Long id, @RequestParam("name") String name,
            @RequestParam("price") Long price,
            @RequestParam("image") MultipartFile image) {
        ProductModel product = new ProductModel(id, name, price, false, id, price, name);
        productService.saveProduct(product);
        return ResponseEntity.ok("Saved!");
    }
}
