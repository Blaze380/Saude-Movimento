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
import com.sparktech.saudemovimento.models.converters.ProductConverter;
import com.sparktech.saudemovimento.models.records.ImagesRecord;
import com.sparktech.saudemovimento.models.records.ProductReturnFormRecord;
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
    public void saveProduct(ProductModel productModel, MultipartFile[] images) {
        try {
            for (int i = 0; i < images.length; i++) {
                saveProductImage(images[i]);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        productRepository.save(productModel);

    }

    public List<ProductReturnFormRecord> getAllProducts() {
        final List<ProductModel> products = productRepository.findAll();
        return facadeProducts(products);
    }

    public List<ProductReturnFormRecord> getProductsByCategory(String categoryName) {
        final List<ProductModel> products = productRepository.findByProductCategory(categoryName);
        return facadeProducts(products);
    }

    private List<ProductReturnFormRecord> facadeProducts(List<ProductModel> products) {
        ArrayList<ProductReturnFormRecord> productRecords = new ArrayList<ProductReturnFormRecord>();
        String fileName[] = new String[3];
        for (int i = 0; i < products.size(); i++) {
            fileName[0] = products.get(i).getProductFileName1();
            fileName[1] = products.get(i).getProductFileName2();
            fileName[2] = products.get(i).getProductFileName3();
            ImagesRecord productImages = getAllProductImages(fileName);
            productRecords.add(ProductConverter.modelToProductDto(products.get(i), productImages));
        }
        return productRecords;
    }

    private void saveProductImage(MultipartFile productImage) throws IOException {
        if (!productImage.isEmpty()) {
            final byte imageBytes[] = productImage.getBytes();
            final Path productsPath = Paths
                    .get(imagesPath, productImage.getOriginalFilename());
            createDirectoryPath(imagesPath);
            Files.write(productsPath, imageBytes);
        }
    }

    /**
     * it loads all three product images
     * 
     * @param fileNames
     * @return
     */
    private ImagesRecord getAllProductImages(String[] fileNames) {
        final ImagesRecord productImages = new ImagesRecord(getProductImages(fileNames[0]),
                getProductImages(fileNames[1]), getProductImages(fileNames[2]));
        return productImages;
    }

    /**
     * Loads the image in the images in the local path, and returns in a byte array
     * 
     * @param fileName file name
     * @return array of image bytes
     */
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

    @Deprecated
    private String getConcatenatedPathInLowerCase(String filePath, String fileName, Long productId) {
        return (filePath + productId + fileName).toLowerCase();
    }
}
