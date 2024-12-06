package com.example.book_app_backend.BookPackage;

import com.example.book_app_backend.BookPackage.BookJSON.BookResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public Page<BookResponse> getAllBooks(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Book> books = bookRepository.findAll(pageable);
        List<Book> listedProducts = new ArrayList<>(books.getContent());

        return new PageImpl<>(convert(listedProducts), pageable, books.getTotalElements());
    }

    public List<BookResponse> convert(List<Book> books) {
        List<BookResponse> response = new ArrayList<>();

        for (Book book : books) {
            BookResponse bookResponse = new BookResponse();

            bookResponse.setAuthor(book.getAuthor());
            bookResponse.setDescription(book.getDescription());
            bookResponse.setTitle(book.getTitle());
            bookResponse.setImage(book.getImage());
            bookResponse.setPrice(book.getPrice());
            response.add(bookResponse);
        }

        return response;
    }

    public Page<BookResponse> foundBooks(int page, int size, String name) {
        Pageable pageable = PageRequest.of(page, size);

        if (name.isEmpty()) {
            List<BookResponse> response = convert(bookRepository.findAll(pageable).getContent());
            return new PageImpl<>(response, pageable, bookRepository.findAll(pageable).getTotalElements());
        }

        Page<Book> books = bookRepository.findAllByTitleContaining(pageable, name);
        List<Book> foundBooks = new ArrayList<>(books.getContent());

        if (foundBooks.isEmpty()) {
            pageable = PageRequest.of(page, 15);
        } else {
            pageable = PageRequest.of(page, foundBooks.size());
        }

        return new PageImpl<>(convert(foundBooks), pageable, books.getTotalElements());
    }

    public Optional<Book> findBookByTitle(String title) {
        return this.bookRepository.findBookByTitle(title);
    }
}
