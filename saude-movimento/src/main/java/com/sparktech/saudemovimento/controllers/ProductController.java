package com.sparktech.saudemovimento.controllers;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.sparktech.saudemovimento.models.ProductModel;
import com.sparktech.saudemovimento.models.converters.ProductConverter;
import com.sparktech.saudemovimento.models.records.ProductFormRecord;
import com.sparktech.saudemovimento.services.ProductService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/products")
@AllArgsConstructor
public class ProductController {
    ProductService productService;

    /**
     * TODO add Authentication after!!!
     */
    @PostMapping("/private/save-product")
    public ResponseEntity<?> saveProduct(@ModelAttribute ProductFormRecord productForm) {
        final ProductModel product = ProductConverter.dtoToProductModel(productForm);
        final MultipartFile[] images = { productForm.image1(), productForm.image2(), productForm.image3() };
        productService.saveProduct(product, images);
        return ResponseEntity.ok("Saved!");
    }

    @GetMapping("/public/all-products")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @GetMapping("/public/products-by-category/{categoryName}")
    public ResponseEntity<?> getProductByCategory(@PathVariable("categoryName") String categoryName) {
        return null;
    }
}
