package com.example.backend.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String saveImage(MultipartFile file) throws IOException;
    Resource loadImageAsResource(String fileName);
    String generateFileName(String extension);
}