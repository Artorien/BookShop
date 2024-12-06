package com.example.book_app_backend.AWS;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.InputStream;

@Service
public class S3Service {
    @Autowired
    private S3Config s3Config;

    public InputStream getObject(GetObjectRequest getObjectRequest)
    {
        return s3Config.s3Client().getObject(getObjectRequest, software.amazon.awssdk.core.sync.ResponseTransformer.toInputStream());
    }
}
