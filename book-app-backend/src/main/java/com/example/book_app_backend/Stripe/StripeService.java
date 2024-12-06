package com.example.book_app_backend.Stripe;

import com.stripe.Stripe;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class StripeService {

    public StripeService(@Value("${stripe.secret.key}") String secretKey) {
        Stripe.apiKey = secretKey;
    }

    public Session createCheckoutSession(String bookTitle, double price, String userEmail) throws Exception {
        String encodedTitle = URLEncoder.encode(bookTitle, StandardCharsets.UTF_8.toString()).replace("+", "%20");
        SessionCreateParams.LineItem lineItem = SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(
                        SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd")
                                .setUnitAmount((long) (price * 100))
                                .setProductData(
                                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                .setName(bookTitle)
                                                .build())
                                .build())
                .build();


        SessionCreateParams params = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/details/title=" + encodedTitle + "/sessionId={CHECKOUT_SESSION_ID}")
                .setCancelUrl("http://localhost:3000/book/" + encodedTitle)
                .setCustomerEmail(userEmail)
                .addLineItem(lineItem)
                .putMetadata("bookTitle", bookTitle)
                .putMetadata("price", String.valueOf(price))
                .build();

        return Session.create(params);
    }
}

