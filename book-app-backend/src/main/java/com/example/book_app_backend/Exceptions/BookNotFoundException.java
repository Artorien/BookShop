package com.example.book_app_backend.Exceptions;

public class BookNotFoundException extends Exception{
    public BookNotFoundException() {
        super("Book does not exist");
    }
}
