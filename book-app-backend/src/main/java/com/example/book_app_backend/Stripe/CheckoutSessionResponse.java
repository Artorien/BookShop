package com.example.book_app_backend.Stripe;

public class CheckoutSessionResponse {
    private String sessionId;

    public CheckoutSessionResponse() {

    }

    public CheckoutSessionResponse(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
