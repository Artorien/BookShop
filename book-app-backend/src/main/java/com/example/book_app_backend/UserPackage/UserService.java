package com.example.book_app_backend.UserPackage;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.PurchasePackage.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private PurchaseService purchaseService;

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public void saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public String generateToken() {
        return UUID.randomUUID().toString();
    }

    public void sendEmail(User user, String token) {
        String subject = "Email Verification";
        String verificationURL = "http://localhost:3000/verification?token=" + token;
        String message = "Please click the following link to verify your email: " + verificationURL;

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject(subject);
        mailMessage.setText(message);
        mailSender.send(mailMessage);
    }

    public boolean hasPurchased(Book book, User user) {
        return purchaseService.getPurchaseByBookAndUser(book, user) != null;
    }

    public Optional<User> findUserByToken(String token) {
        return userRepository.findUserByToken(token);
    }

    public void updateUser(User user) {
        userRepository.save(user);
    }
}
