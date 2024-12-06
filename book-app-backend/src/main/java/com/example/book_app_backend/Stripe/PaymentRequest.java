package com.example.book_app_backend.Stripe;

import java.util.List;

public class PaymentRequest
{
    private String bookTitle;
    private Double price;

    public PaymentRequest()
    {

    }

    public PaymentRequest(String bookTitle, Double price)
    {
        this.bookTitle = bookTitle;
        this.price = price;
    }

    public String getBookTitle() {
        return this.bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public Double getPrice() {
        return this.price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}
