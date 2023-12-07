package tech.helen.bookshop.controller;

import org.springframework.web.bind.annotation.*;

import tech.helen.bookshop.config.Environment;
import tech.helen.bookshop.requestmodels.ReviewRequestModel;
import tech.helen.bookshop.service.ReviewService;
import tech.helen.bookshop.utils.JWTParser;

@CrossOrigin(Environment.host)
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/product")
    public Boolean reviewProductByUser(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long productId) throws Exception {
        String userEmail = JWTParser.extractEmail(token);
        if (userEmail == null) {
            throw new Exception("Ошибка пользователя");
        }
        return reviewService.userReviewListed(userEmail, productId);
    }

    @PostMapping("/secure")
    public void postReview(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody ReviewRequestModel reviewRequest) throws Exception {
        String userEmail = JWTParser.extractEmail(token);
        if (userEmail == null) {
            throw new Exception("Ошибка пользователя");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }
}
