package com.example.book_app_backend.BookPackage.BookJSON;

public class BookToWishList {
    private String title;

    public BookToWishList() {

    }

    public BookToWishList(String title) {
        this.title = title;
    }

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
