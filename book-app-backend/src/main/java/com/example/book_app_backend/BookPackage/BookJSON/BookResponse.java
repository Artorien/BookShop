package com.example.book_app_backend.BookPackage.BookJSON;

public class BookResponse {
    private String title;
    private String description;
    private String image;
    private String author;
    private float price;

    public BookResponse() {

    }

    public BookResponse(String title,
                        String description,
                        String image,
                        String author,
                        float price) {
        this.title = title;
        this.description = description;
        this.image = image;
        this.author = author;
        this.price = price;
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
}
