package tech.helen.bookshop.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "history")
@Data
public class History {

    public History() {
    }

    public History(
            String userEmail,
            String orderDate,
            String returnedDate,
            String title,
            String creator,
            String description,
            String img) {
        this.userEmail = userEmail;
        this.orderDate = orderDate;
        this.returnedDate = returnedDate;
        this.title = title;
        this.creator = creator;
        this.description = description;
        this.img = img;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "returned_date")
    private String returnedDate;

    @Column(name = "title")
    private String title;

    @Column(name = "creator")
    private String creator;

    @Column(name = "description")
    private String description;

    @Column(name = "img")
    private String img;
}