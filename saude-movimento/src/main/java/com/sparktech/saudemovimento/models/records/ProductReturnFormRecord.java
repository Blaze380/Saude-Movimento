package com.sparktech.saudemovimento.models.records;

import java.math.BigDecimal;

public record ProductReturnFormRecord(Long id, String name, BigDecimal price, boolean isDiscount,
        Long discountPercentage,
        BigDecimal discountPrice, String category, ImagesRecord images) {

}
