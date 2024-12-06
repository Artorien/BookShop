package com.example.book_app_backend.PurchasePackage;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.UserPackage.User;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "purchases")
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    private Book book;
    @ManyToOne
    @JsonBackReference
    private User user;
    private String purchaseDate;

    public Purchase() {

    }

    public Purchase(UUID id,
                    Book book,
                    User user,
                    String purchaseDate) {
        this.id = id;
        this.book = book;
        this.user = user;
        this.purchaseDate = purchaseDate;
    }

    public UUID getId() {
        return this.id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Book getBook() {
        return this.book;
    }

    public void setBook(Book book) {
        this.book = book;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getPurchaseDate() {
        return this.purchaseDate;
    }

    public void setPurchaseDate(String purchaseDate) {
        this.purchaseDate = purchaseDate;
    }
}
