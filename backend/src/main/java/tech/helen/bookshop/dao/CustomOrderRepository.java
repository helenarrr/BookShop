package tech.helen.bookshop.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import tech.helen.bookshop.entity.CustomOrder;

public interface CustomOrderRepository extends JpaRepository<CustomOrder, Long> {

    CustomOrder findByUserEmailAndProductId(String userEmail, Long productId);

    List<CustomOrder> findProductByUserEmail(String userEmail);
}
