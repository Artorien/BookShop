package com.example.book_app_backend.BookPackage;

import com.example.book_app_backend.AWS.S3Service;
import com.example.book_app_backend.BookPackage.BookJSON.BookResponse;
import com.example.book_app_backend.ResponseMessage.ResponseJSON;
import com.example.book_app_backend.UserPackage.User;
import com.example.book_app_backend.UserPackage.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamResource;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;

import java.io.InputStream;
import java.util.Optional;

@RestController
public class BookController {
    @Autowired
    private BookService bookService;
    @Autowired
    private UserService userService;
    @Autowired
    private S3Service s3Service;
    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @GetMapping("/all")
    public Page<BookResponse> allBooks(@RequestParam(defaultValue = "0") int page,
                                       @RequestParam(defaultValue = "15") int size) {
        new Thread(() -> {
            try {
                Thread.sleep(2000);
            }
            catch (Exception e){
                System.err.println(e);
            }
        }).start();
        return bookService.getAllBooks(page, size);
    }

    @GetMapping("/search")
    public Page<BookResponse> foundBooks(@RequestParam(defaultValue = "0", required = false) int page,
                                         @RequestParam(defaultValue = "15", required = false) int size,
                                         @RequestParam() String name) {
        return bookService.foundBooks(page, size, name);
    }

    @GetMapping("/read")
    public ResponseEntity<?> read(@RequestParam() String title) {
        String email;

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
            System.out.println("Email: " + email);
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ResponseJSON("Unauthorized request"));
        }

        User user = optionalUser.get();
        Optional<Book> optionalBook = bookService.findBookByTitle(title);

        if (optionalBook.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseJSON("This book was not found"));
        }

        Book book = optionalBook.get();

        if (!userService.hasPurchased(book, user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(new ResponseJSON("This book was not purchased"));
        }

        GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucketName)
                .key(book.getItemKey())
                .build();

        try {
            InputStream bookStream = s3Service.getObject(getObjectRequest);
            InputStreamResource resource = new InputStreamResource(bookStream);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType("application/epub+zip"))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + book.getItemKey() + "\"")
                    .body(resource);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseJSON("Failed to fetch the book from S3"));
        }
    }


    @GetMapping("/book")
    public ResponseEntity<?> book(@RequestParam() String title) {
        Optional<Book> optionalBook = bookService.findBookByTitle(title);
        BookResponse bookResponse = new BookResponse();

        if (optionalBook.isPresent()) {
            Book book = optionalBook.get();

            bookResponse.setTitle(book.getTitle());
            bookResponse.setAuthor(book.getAuthor());
            bookResponse.setImage(book.getImage());
            bookResponse.setPrice(book.getPrice());
            bookResponse.setDescription(book.getDescription());
        }

        return ResponseEntity.ok(bookResponse);
    }
}
