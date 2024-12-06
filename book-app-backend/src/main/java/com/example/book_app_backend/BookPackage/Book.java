package com.example.book_app_backend.BookPackage;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "books")
public class Book {
    @Id
    private Integer id;
    private String title;
    private String description;
    private String image;
    private String awsUrl;
    private String itemKey;
    private String author;
    private float price;

    public Book() {

    }

    public Book(Integer id,
                String title,
                String description,
                String image,
                String awsUrl,
                String author,
                float price,
                String itemKey) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.awsUrl = awsUrl;
        this.author = author;
        this.price = price;
        this.itemKey = itemKey;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getAwsUrl() {
        return this.awsUrl;
    }

    public void setAwsUrl(String awsUrl) {
        this.awsUrl = awsUrl;
    }

    public String getAuthor() {
        return this.author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public float getPrice() {
        return this.price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getItemKey() {
        return this.itemKey;
    }

    public void setItemKey(String itemKey) {
        this.itemKey = itemKey;
    }
}
