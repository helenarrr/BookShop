package tech.helen.bookshop.requestmodels;

import lombok.Data;

@Data
public class AppendProductRequest {
    private String title;
    private String creator;
    private String description;
    private int copies;
    private String category;
    private String img;
}