package tech.helen.bookshop.responsemodels;

import lombok.Data;
import tech.helen.bookshop.entity.Product;

@Data
public class ShelfProductResponseModel {

    private Product product;
    private int timeLeft;

    public ShelfProductResponseModel(Product product, int timeleft) {
        this.product = product;
        this.timeLeft = timeleft;
    }

    public ShelfProductResponseModel() {
    }
}
