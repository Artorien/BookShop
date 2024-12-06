package com.example.book_app_backend.Stripe.JSON;

public class PaymentVerificationRequest {
    private String sessionId;

    public PaymentVerificationRequest() {

    }

    public PaymentVerificationRequest(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }
}
