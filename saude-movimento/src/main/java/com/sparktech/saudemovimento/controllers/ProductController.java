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
import com.sparktech.saudemovimento.models.records.ProductFromRecord;
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
    public ResponseEntity<?> saveProduct(@RequestParam("name") String name,
            @RequestParam("price") BigDecimal price, @RequestParam("isDiscount") boolean isDiscount,
            @RequestParam("discountPercentage") Long discountPercentage,
            @RequestParam("discountPrice") BigDecimal discountPrice, @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image) {
        // final ProductModel product = new ProductModel(0L, name, price, isDiscount,
        // discountPercentage, discountPrice,
        // category, image.getOriginalFilename());
        // productService.saveProduct(product, image);
        return ResponseEntity.ok("Saved!");
    }

    // POST
    @PostMapping("/private/update-product")
    // public ResponseEntity<?> updateProduct(@RequestParam("id") Long id,
    // @RequestParam("name") String name,
    // @RequestParam("price") BigDecimal price, @RequestParam("isDiscount") boolean
    // isDiscount,
    // @RequestParam("discountPercentage") Long discountPercentage,
    // @RequestParam("discountPrice") BigDecimal discountPrice,
    // @RequestParam("category") String category,
    // @RequestParam("image") MultipartFile image) {
    public ResponseEntity<?> updateProduct(@ModelAttribute ProductFromRecord productForm) {
        System.out.println(productForm.image().getOriginalFilename());
        // final ProductModel product = new ProductModel(id, name, price, isDiscount,
        // discountPercentage, discountPrice,
        // category, image.getOriginalFilename());
        // productService.saveProduct(product, image);
        return ResponseEntity.ok("Saved!");
    }

    @GetMapping("/public/all-products")
    public ResponseEntity<?> getAllProducts() {
        return ResponseEntity.ok().body(productService.getAllProducts());
    }

    @GetMapping("/public/products-by-category/{categoryId}")
    public ResponseEntity<?> getProductByCategory(@PathVariable("categoryId") String categoryId) {
        return null;
    }
}
