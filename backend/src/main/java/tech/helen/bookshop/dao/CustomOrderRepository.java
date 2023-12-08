package tech.helen.bookshop.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import tech.helen.bookshop.entity.CustomOrder;

public interface CustomOrderRepository extends JpaRepository<CustomOrder, Long> {

    CustomOrder findByUserEmailAndProductId(String userEmail, Long productId);

    List<CustomOrder> findProductByUserEmail(String userEmail);

    @Modifying
    @Query("delete from CustomOrder where product_id in :product_id")
    void deleteAllByProductId(@Param("product_id") Long productId);
}
