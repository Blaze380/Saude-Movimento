package com.sparktech.saudemovimento.models.converters;

import com.sparktech.saudemovimento.models.ProductModel;
import com.sparktech.saudemovimento.models.records.ImagesRecord;
import com.sparktech.saudemovimento.models.records.ProductFormRecord;
import com.sparktech.saudemovimento.models.records.ProductReturnFormRecord;

/**
 * This static class, allows to make conversions like, convert the product model
 * to product DTO and vice-versa
 */
public class ProductConverter {
    public static ProductModel dtoToProductModel(ProductFormRecord product, Long productId) {
        return new ProductModel(
                productId,
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

    public static ProductReturnFormRecord modelToProductDto(ProductModel product, ImagesRecord productImages) {
        return new ProductReturnFormRecord(
                product.getProductID(),
                product.getProductName(),
                product.getProductPrice(),
                product.isProductDiscount(),
                product.getProductDiscountPercentage(),
                product.getProductDiscountPrice(),
                product.getProductCategory(),
                productImages);
    }
}
