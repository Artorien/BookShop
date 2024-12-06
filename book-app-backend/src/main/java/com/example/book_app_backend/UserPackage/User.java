package com.example.book_app_backend.UserPackage;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.PurchasePackage.Purchase;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String email;
    private String password;
    private String dateOfCreation;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Purchase> purchases;
    private String token;
    @ElementCollection
    private List<String> wishlist;
    @ElementCollection
    private List<String> purchasesLocalMemory;

    public User() {

    }

    public User(UUID id,
                String email,
                String password,
                String dateOfCreation,
                List<Purchase> purchases,
                String token,
                List<String> wishlist,
                List<String> purchasesLocalMemory) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.dateOfCreation = dateOfCreation;
        this.purchases = purchases;
        this.token = token;
        this.wishlist = wishlist;
        this.purchasesLocalMemory = purchasesLocalMemory;
    }

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
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

    public String getDateOfCreation() {
        return this.dateOfCreation;
    }

    public void setDateOfCreation(String dateOfCreation) {
        this.dateOfCreation = dateOfCreation;
    }

    public List<Purchase> getPurchases() {
        return this.purchases;
    }

    public void setPurchases(List<Purchase> purchases) {
        this.purchases = purchases;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getWishlist() {
        return this.wishlist;
    }

    public void setWishlist(List<String> wishlist) {
        this.wishlist = wishlist;
    }

    public List<String> getPurchasesLocalMemory() {
        return this.purchasesLocalMemory;
    }

    public void setPurchasesLocalMemory(List<String> purchasesLocalMemory) {
        this.purchasesLocalMemory = purchasesLocalMemory;
    }
}
