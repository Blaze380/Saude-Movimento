package com.sparktech.saudemovimento.services;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.sparktech.saudemovimento.models.ProductModel;
import com.sparktech.saudemovimento.models.records.ProductRecord;
import com.sparktech.saudemovimento.repositories.ProductRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ProductService {
    private ProductRepository productRepository;
    private final String imagesPath = ".\\src\\main\\resources\\static\\images\\";

    /**
     * Saves a product...
     * 
     * @param productModel product entity
     * @param productImage product image
     */
    public void saveProduct(ProductModel productModel, MultipartFile productImage) {
        try {
            saveProductImage(productImage, productModel.getProductID());
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Sets the original filename with an ID, to prevent duplicated images
        productModel
                .setProductFileName1(productModel.getProductID() + productModel.getProductFileName1().toLowerCase());
        productRepository.save(productModel);

    }

    public List<ProductRecord> getAllProducts() {
        final List<ProductModel> products = productRepository.findAll();
        ArrayList<ProductRecord> productRecords = new ArrayList<ProductRecord>();
        String fileName = "";
        for (int i = 0; i < products.size(); i++) {
            fileName = products.get(i).getProductFileName1();
            productRecords.add(new ProductRecord(products.get(i), getProductImages(fileName)));
        }
        return productRecords;
    }

    private void saveProductImage(MultipartFile productImage, Long productId) throws IOException {
        if (!productImage.isEmpty()) {
            final byte imageBytes[] = productImage.getBytes();
            final Path productsPath = Paths
                    .get(getConcatenatedPathInLowerCase(imagesPath, productImage.getOriginalFilename(), productId));
            Files.write(productsPath, imageBytes);
            createDirectoryPath(imagesPath);
        }
    }

    private byte[] getProductImages(String fileName) {
        File productImagePath = new File(imagesPath + fileName);
        byte[] imageBytes = null;
        try {
            imageBytes = Files.readAllBytes(productImagePath.toPath());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return imageBytes;
    }

    private void createDirectoryPath(String path) {
        final File filePath = new File(path);
        if (!filePath.exists()) {
            filePath.mkdirs();
        }
    }

    private String getConcatenatedPathInLowerCase(String filePath, String fileName, Long productId) {
        return (filePath + productId + fileName).toLowerCase();
    }
}
