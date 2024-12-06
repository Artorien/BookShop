package com.example.book_app_backend.PurchasePackage;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.BookPackage.BookRepository;
import com.example.book_app_backend.BookPackage.BookService;
import com.example.book_app_backend.Exceptions.BookNotFoundException;
import com.example.book_app_backend.UserPackage.User;
import com.example.book_app_backend.UserPackage.UserRepository;
import com.example.book_app_backend.UserPackage.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class PurchaseService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private PurchaseRepository purchaseRepository;

    public void handleSuccesfullPayment(String email, String bookTitle) throws BookNotFoundException {
        User user = userRepository.findUserByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User does not exist"));
        Book book = bookRepository.findBookByTitle(bookTitle).orElseThrow(() -> new BookNotFoundException());

        Purchase purchase = new Purchase();
        purchase.setUser(user);
        purchase.setBook(book);
        purchase.setPurchaseDate(LocalDate.now().toString());
        user.getPurchases().add(purchase);
        user.getPurchasesLocalMemory().add(book.getTitle());
        purchaseRepository.save(purchase);
        System.out.println("Success!");
    }

    public Purchase getPurchaseByBookAndUser(Book book, User user) {
        return purchaseRepository.findPurchaseByBookAndUser(book, user);
    }
}
