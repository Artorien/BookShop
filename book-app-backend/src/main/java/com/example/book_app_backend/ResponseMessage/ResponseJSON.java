package com.example.book_app_backend.ResponseMessage;

public class ResponseJSON {
    private String message;

    public ResponseJSON() {

    }

    public ResponseJSON(String message) {
        this.message = message;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
