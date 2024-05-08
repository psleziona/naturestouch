package com.example.backend.service;

import com.example.backend.config.UploadProperties;
import jakarta.servlet.ServletContext;
import lombok.AllArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.commons.lang3.RandomStringUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@AllArgsConstructor
public class ImageServiceImpl implements ImageService{
    private final UploadProperties uploadProperties;
    @Override
    public String saveImage(MultipartFile file) throws IOException {
        byte[] bytes = file.getBytes();
        String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf(".") + 1);
        String fileName = generateFileName(extension);
        Path path = Paths.get(uploadProperties.getDirectory() + "/" + fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, bytes);
        return fileName;
    }

    @Override
    public Resource loadImageAsResource(String fileName) {
        try {
            Path filePath = Paths.get(uploadProperties.getDirectory()).resolve(fileName);
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                return resource;
            } else {
                return null;
            }
        } catch (MalformedURLException e) {
            return null;
        }
    }

    @Override
    public String generateFileName(String extension) {
        return RandomStringUtils.randomAlphanumeric(30) + "." + extension;
    }
}