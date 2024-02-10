package com.sparktech.saudemovimento.models.records;

import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

public record ProductFromRecord(String name, BigDecimal price, boolean isDiscount, Long discountPercentage,
        BigDecimal discountPrice, String category, MultipartFile image) {

}
