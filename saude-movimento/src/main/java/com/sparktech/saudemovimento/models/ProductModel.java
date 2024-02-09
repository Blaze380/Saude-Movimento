package com.sparktech.saudemovimento.models;

import org.springframework.web.multipart.MultipartFile;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "products")
public class ProductModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long productID;
    private String productName;
    private Long productPrice;
    private boolean isProductDiscount;
    private Long productDiscountPercentage;
    private Long productDiscountPrice;
    private String productCategory;
    // private MultipartFile productImage;
    // private MultipartFile productImage2;
    // private MultipartFile productImage3;
}
