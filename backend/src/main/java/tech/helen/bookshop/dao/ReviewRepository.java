package tech.helen.bookshop.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import tech.helen.bookshop.entity.Review;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByProductId(@RequestParam("productId") Long productId, Pageable pageable);

    Review findByUserEmailAndProductId(String userEmail, Long productId);

    @Modifying
    @Query("delete from Review where product_id in :product_id")
    void deleteAllByProductId(@Param("product_id") Long productId);

}
