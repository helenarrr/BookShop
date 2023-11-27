package tech.helen.bookshop.requestmodels;

import java.util.Optional;

import lombok.Data;

@Data
public class ReviewRequestModel {
    private double rating;
    private Long productId;
    private Optional<String> reviewDescription;
}
