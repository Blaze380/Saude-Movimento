package com.sparktech.saudemovimento.models.records;

import com.sparktech.saudemovimento.models.ProductModel;

/**
 * Product DTO
 */
public record ProductRecord(ProductModel productModel, byte[] productImage) {

}
