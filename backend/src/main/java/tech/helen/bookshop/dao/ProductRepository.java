package tech.helen.bookshop.dao;

import tech.helen.bookshop.entity.Product;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ProductRepository extends JpaRepository<Product, Long> {

        Page<Product> findByTitleContaining(
                        @RequestParam("title") String title,
                        Pageable pageable);

        Page<Product> findByCategory(
                        @RequestParam("category") String category,
                        Pageable pageable);

        @Query("select product from Product product where product.id in :product_ids")
        List<Product> findProductByProductIds(@Param("product_ids") List<Long> productId);
}
