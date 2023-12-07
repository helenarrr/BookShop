package tech.helen.bookshop.entity;

import javax.persistence.*;

import lombok.Data;

@Entity
@Table(name = "Messages")
@Data
public class Message {

    public Message() {
    }

    public Message(String title, String userText) {
        this.title = title;
        this.userText = userText;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "title")
    private String title;

    @Column(name = "user_text")
    private String userText;

    @Column(name = "admin_email")
    private String adminEmail;

    @Column(name = "admin_text")
    private String adminText;

    @Column(name = "closed")
    private boolean closed;
}
