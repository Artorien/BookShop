package com.example.book_app_backend.UserPackage.Authentication;

public class NewCredentialsBody {
    private String oldEmail;
    private String newEmail;
    private String newPassword;

    public NewCredentialsBody() {

    }

    public NewCredentialsBody(String oldEmail,
                              String newEmail,
                              String newPassword) {
        this.oldEmail = oldEmail;
        this.newEmail = newEmail;
        this.newPassword = newPassword;
    }

    public String getOldEmail() {
        return this.oldEmail;
    }

    public void setOldEmail(String oldEmail) {
        this.oldEmail = oldEmail;
    }

    public String getNewEmail() {
        return this.newEmail;
    }

    public void setNewEmail(String newEmail) {
        this.newEmail = newEmail;
    }

    public String getNewPassword() {
        return this.newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
