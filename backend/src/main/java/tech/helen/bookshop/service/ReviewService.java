package tech.helen.bookshop.service;

import java.sql.Date;
import java.time.LocalDate;

import org.springframework.stereotype.Service;

import tech.helen.bookshop.dao.ReviewRepository;
import tech.helen.bookshop.entity.Review;
import tech.helen.bookshop.requestmodels.ReviewRequestModel;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(
            String userEmail,
            ReviewRequestModel reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndProductId(
                userEmail, reviewRequest.getProductId());

        if (validateReview != null) {
            throw new Exception("Повторная попытка");
        }

        Review review = new Review();
        review.setProductId(reviewRequest.getProductId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(
                    reviewRequest
                            .getReviewDescription()
                            .map(t -> t.toString())
                            .orElse(null));
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public Boolean userReviewListed(String userEmail, Long productId) {
        return reviewRepository
                .findByUserEmailAndProductId(userEmail, productId) != null;
    }
}