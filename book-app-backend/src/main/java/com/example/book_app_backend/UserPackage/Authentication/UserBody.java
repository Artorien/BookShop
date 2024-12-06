package com.example.book_app_backend.UserPackage.Authentication;

public class UserBody
{
    private String email;
    private String password;

    public UserBody() {

    }

    public UserBody(String email,
                    String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
