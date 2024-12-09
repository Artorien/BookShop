package com.example.book_app_backend.BookPackage;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
    Page<Book> findAll(Pageable pageable);
    Page<Book> findAllByTitleContainingIgnoreCase(Pageable pageable, String title);
    Optional<Book> findBookByTitle(String title);
}
