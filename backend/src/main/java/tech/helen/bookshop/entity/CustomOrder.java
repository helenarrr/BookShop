package tech.helen.bookshop.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Table(name = "product_order")
@Data
public class CustomOrder {

    public CustomOrder() {
    }

    public CustomOrder(
            String userEmail,
            String orderDate,
            String returnDate,
            Long productId) {
        this.userEmail = userEmail;
        this.orderDate = orderDate;
        this.returnDate = returnDate;
        this.productId = productId;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "return_date")
    private String returnDate;

    @Column(name = "product_id")
    private Long productId;
}
