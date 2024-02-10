package com.sparktech.saudemovimento.models.converters;


import com.sparktech.saudemovimento.models.ProductModel;
import com.sparktech.saudemovimento.models.records.ProductFormRecord;

public class ProductConverter {
    public static ProductModel dtoToProductModel(ProductFormRecord product){
        return new ProductModel(1L,
        product.name(),
        product.price(),
        product.isDiscount(),
        product.discountPercentage(),
        product.discountPrice(),
        product.category(),
        product.image1().getOriginalFilename(),
        product.image2().getOriginalFilename(),
        product.image3().getOriginalFilename());
    }
}
