package com.example.book_app_backend.UserPackage;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.BookPackage.BookJSON.BookResponse;
import com.example.book_app_backend.BookPackage.BookJSON.BookToWishList;
import com.example.book_app_backend.BookPackage.BookService;
import com.example.book_app_backend.JWT.JwtTokenFactory;
import com.example.book_app_backend.PurchasePackage.Purchase;
import com.example.book_app_backend.ResponseMessage.ResponseJSON;
import com.example.book_app_backend.UserPackage.Authentication.NewCredentialsBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import com.example.book_app_backend.UserPackage.Authentication.UserBody;
import org.springframework.security.authentication.AuthenticationManager;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Lazy
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenFactory jwtTokenFactory;
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;

    @PostMapping("/registration")
    public ResponseEntity<?> registration(@RequestBody User user) {
        if (userService.findUserByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("This email is already taken");
        }

        String token = userService.generateToken();
        user.setToken(token);
        user.setDateOfCreation(LocalDate.now().toString());
        userService.saveUser(user);
        userService.sendEmail(user, token);
        System.out.println("User by token: " + userService.findUserByToken(token));

        return ResponseEntity.status(HttpStatus.OK).body("Success");
    }

    @PostMapping("/newcredentials")
    public ResponseEntity<?> newCredentials(@RequestBody NewCredentialsBody newCredentialsBody) {
        System.out.println("Old email: " + newCredentialsBody.getOldEmail());
        String oldEmail = newCredentialsBody.getOldEmail();
        Optional<User> optionalUser = userService.findUserByEmail(oldEmail);
        String token = userService.generateToken();

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setToken(token);
            user.setEmail(newCredentialsBody.getNewEmail());
            user.setPassword(newCredentialsBody.getNewPassword());
            userService.saveUser(user);
            userService.sendEmail(user, token);

            return ResponseEntity.ok("user updated successfully");
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Error updating user's credentials");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserBody loginBody) {
        SecurityContext contextHolder = SecurityContextHolder.createEmptyContext();
        System.out.println("Password: " + loginBody.getPassword());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                            loginBody.getEmail(),
                            loginBody.getPassword()
                )
        );
        contextHolder.setAuthentication(authentication);
        SecurityContextHolder.setContext(contextHolder);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtTokenFactory.generateToken(userDetails.getUsername());
        Optional<User> optionalUser = userService.findUserByEmail(loginBody.getEmail());
        System.out.println("User: " + optionalUser);


        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setJwtToken(jwt);
            userService.updateUser(user);

            System.out.println(ResponseEntity.ok(user));

            return ResponseEntity.ok(user);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body(new ResponseJSON("Invalid credentials"));
    }

    @GetMapping("/mybooks")
    public ResponseEntity<?> myBooks() {
        String email;
        List<Book> boughtBooks = new ArrayList<>();

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
            System.out.println("Email: " + email);
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            for (Purchase purchase : user.getPurchases()) {
                Book purchasedBook = purchase.getBook();

                boughtBooks.add(purchasedBook);
            }

            return ResponseEntity.ok(boughtBooks);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
    }

    @GetMapping("/wishlist")
    public ResponseEntity<?> wishlist(@RequestParam(defaultValue = "0") int page,
                                      @RequestParam(defaultValue = "15", required = false) int size) {
        String email;
        Pageable pageable = PageRequest.of(page, size);

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<BookResponse> wishlistBooks = new ArrayList<>();

            for (String bookTitle : user.getWishlist()) {
                Optional<Book> optionalBook = bookService.findBookByTitle(bookTitle);
                BookResponse bookResponse = new BookResponse();

                if (optionalBook.isPresent()) {
                    Book book = optionalBook.get();

                    if (!user.getPurchasesLocalMemory().contains(book.getTitle()))
                    {
                        bookResponse.setPrice(book.getPrice());
                        bookResponse.setImage(book.getImage());
                        bookResponse.setAuthor(book.getAuthor());
                        bookResponse.setDescription(book.getDescription());
                        bookResponse.setTitle(book.getTitle());

                        wishlistBooks.add(bookResponse);
                    }
                }
            }

            int start = (int) Math.min((long) page * size, wishlistBooks.size());
            int end = Math.min(start + size, wishlistBooks.size());
            List<BookResponse> paginatedList = wishlistBooks.subList(start, end);

            if (!paginatedList.isEmpty()) {
                size = paginatedList.size();
            }

            return ResponseEntity.ok(new PageImpl<>(paginatedList, PageRequest.of(page, size), wishlistBooks.size()));
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Error retrieving wishlist");
    }

    @GetMapping("/clearwishlist")
    public ResponseEntity<?> clearwishlist() {
        String email;

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            user.setWishlist(null);
            userService.updateUser(user);

            return ResponseEntity.ok(user.getWishlist());
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
    }

    @GetMapping("/addtowishlist")
    public ResponseEntity<?> addToWishList(@RequestParam String title) {
        String email;

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);
        Optional<Book> optionalBook = bookService.findBookByTitle(title);

        if (optionalUser.isPresent() && optionalBook.isPresent()) {
            User user = optionalUser.get();
            Book book = optionalBook.get();

            if (user.getWishlist().contains(book.getTitle())) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("Book already in wishlist");
            }

            user.getWishlist().add(book.getTitle());
            userService.updateUser(user);

            return ResponseEntity.ok(new BookToWishList(book.getTitle()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Book not found");
        }
    }

    @GetMapping("/removefromwishlist")
    public ResponseEntity<?> removeFromWishList(@RequestParam() String title) {
        String email;
        String bookName = "";

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);
        Optional<Book> optionalBook = bookService.findBookByTitle(title);

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (optionalBook.isPresent()) {
                Book book = optionalBook.get();
                bookName = book.getTitle();

                user.getWishlist().remove(book.getTitle());
            }

            userService.updateUser(user);

            return ResponseEntity.ok(bookName);
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed to remove the book");
    }

    @GetMapping("/verification")
    public ResponseEntity<?> verify(@RequestParam("token") String token) {
        System.out.println("Token: " + token);
        Optional<User> optionalUser = userService.findUserByToken(token);
        System.out.println("User: " + optionalUser);
        System.out.println("User present: " + optionalUser.isPresent());

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();

            if (user.getToken().equals(token))
            {
                String jwt = jwtTokenFactory.generateToken(user.getEmail());
                user.setToken(null);
                user.setJwtToken(jwt);
                userService.updateUser(user);

                return ResponseEntity.ok(user);
            }

            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email verification failed - token failure");
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Email verification failed, unable to find a user");
    }
}
