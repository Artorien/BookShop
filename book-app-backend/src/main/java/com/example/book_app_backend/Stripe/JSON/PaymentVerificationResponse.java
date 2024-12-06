package com.example.book_app_backend.Stripe.JSON;

public class PaymentVerificationResponse {
    private String message;

    public PaymentVerificationResponse() {

    }

    public PaymentVerificationResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
