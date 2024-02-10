package com.sparktech.saudemovimento.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sparktech.saudemovimento.models.CategoryModel;

public interface CategoryRepository extends JpaRepository<CategoryModel, Long> {
    CategoryModel findByCategoryName(String categoryName);
}
