package com.example.book_app_backend.Stripe;

import com.example.book_app_backend.BookPackage.Book;
import com.example.book_app_backend.BookPackage.BookService;
import com.example.book_app_backend.PurchasePackage.PurchaseService;
import com.example.book_app_backend.Stripe.JSON.PaymentVerificationRequest;
import com.example.book_app_backend.Stripe.JSON.PaymentVerificationResponse;
import com.example.book_app_backend.UserPackage.User;
import com.example.book_app_backend.UserPackage.UserService;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class StripeController {
    private final StripeService stripeService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookService bookService;
    @Autowired
    private PurchaseService purchaseService;

    public StripeController(StripeService stripeService) {
        this.stripeService = stripeService;
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestBody PaymentRequest paymentRequest) {
        String email;

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
            System.out.println("Email: " + email);
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);
        System.out.println("User is present: " + optionalUser.isPresent());
        if (optionalUser.isPresent())
        {
            Optional<Book> optionalBook = bookService.findBookByTitle(paymentRequest.getBookTitle());

            if (optionalBook.isPresent())
            {
                Book book = optionalBook.get();
                System.out.println("Book: " + book.getTitle());
                try
                {
                    Session session = stripeService.createCheckoutSession(book.getTitle(), paymentRequest.getPrice(), email);
                    System.out.println("Session: " + session);
                    return ResponseEntity.ok(new CheckoutSessionResponse(session.getId()));
                } catch (Exception e)
                {
                    System.out.println("Error: " + e);
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
                }
            }
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Error retrieving session");
    }

//    @RequestMapping("/stripe/webhook")
//    public class StripeWebhookController {
//
//        @Value("${stripe.webhook.secret}")
//        private String endpointSecret;
//
//        private final PurchaseService purchaseService;
//
//        public StripeWebhookController(PurchaseService purchaseService) {
//            this.purchaseService = purchaseService;
//        }
//
//        @PostMapping
//        public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) throws BookNotFoundException {
//            Event event;
//
//            try {
//                event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
//            } catch (SignatureVerificationException e) {
//                return ResponseEntity.badRequest().body("Webhook signature verification failed");
//            }
//
//            if ("checkout.session.completed".equals(event.getType())) {
//                Session session = (Session) event.getDataObjectDeserializer()
//                        .getObject()
//                        .orElseThrow(() -> new RuntimeException("Invalid session data"));
//
//                String userEmail = session.getCustomerEmail();
//                String bookTitle = session.getMetadata().get("bookTitle");
//
//                purchaseService.handleSuccesfullPayment(userEmail, bookTitle);
//            }
//
//            return ResponseEntity.ok("Event handled");
//        }
//    }

    @PostMapping("/payment/verify")
    public ResponseEntity<?> verifyPayment(@RequestBody PaymentVerificationRequest request) {
        System.out.println("Request: " + request.getSessionId());
        String email;

        try {
            email = ((org.springframework.security.core.userdetails.User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getUsername();
            System.out.println("Email: " + email);
        } catch (ClassCastException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized request");
        }

        Optional<User> optionalUser = userService.findUserByEmail(email);

        if (optionalUser.isPresent())
        {
            System.out.println("Session id: " + request.getSessionId());
            try
            {
                String sessionId = request.getSessionId();
                Session session = Session.retrieve(sessionId);


                System.out.println("Payment status: " + session.getPaymentStatus());

                if ("paid".equals(session.getPaymentStatus()))
                {
                    String bookTitle = session.getMetadata().get("bookTitle");

                    purchaseService.handleSuccesfullPayment(session.getCustomerEmail(), bookTitle);

                    return ResponseEntity.ok(new PaymentVerificationResponse("Payment successful"));
                } else
                {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body(new PaymentVerificationResponse("Payment verification failed"));
                }
            } catch (Exception e)
            {
                System.out.println("Error: " + e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(new PaymentVerificationResponse("Payment verification sex"));
            }
        }

        return ResponseEntity.status(HttpStatus.CONFLICT).body("Unauthorized request");
    }
}
