package com.sparktech.saudemovimento.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sparktech.saudemovimento.models.CategoryModel;
import com.sparktech.saudemovimento.repositories.CategoryRepository;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("categories")
@AllArgsConstructor
public class CategoryController {
    CategoryRepository categoryRepository;

    /**
     * Get All registered Categories
     */
    @GetMapping("/public/get-all")
    public ResponseEntity<?> getAllCategories() {
        List<CategoryModel> categories = categoryRepository.findAll();
        return ResponseEntity.ok().body(categories);
    }

    @PostMapping("/private/save-category")
    public ResponseEntity<?> saveCategory(@RequestBody CategoryModel category) {
        if (categoryRepository.findByCategoryName(category.getCategoryName()) != null) {
            return ResponseEntity.badRequest().body("This Category Already Exists!");
        }
        categoryRepository.save(category);
        return ResponseEntity.ok().body("Success!");
    }

    @DeleteMapping("/private/delete-category/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable("categoryId") Long categoryId) {
        if (categoryRepository.existsById(categoryId)) {
            categoryRepository.deleteById(categoryId);
        }
        return ResponseEntity.ok().body("Success!");
    }

}
