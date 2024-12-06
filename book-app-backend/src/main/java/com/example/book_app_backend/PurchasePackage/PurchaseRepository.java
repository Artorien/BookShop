package com.example.book_app_backend.PurchasePackage;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.UserPackage.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, UUID> {
    Purchase findPurchaseByBookAndUser(Book book, User user);
}
