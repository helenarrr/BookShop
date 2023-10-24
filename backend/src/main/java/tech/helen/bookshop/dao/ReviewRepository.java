package tech.helen.bookshop.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import tech.helen.bookshop.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByProductId(@RequestParam("productId") Long productId, Pageable pageable);

    Review findByUserEmailAndProductId(String userEmail, Long productId);

}
