import Book from "./Book";

class ShelfCurrentItem {
    product: Book;
    timeLeft: number;

    constructor(
        product: Book,
        timeLeft: number) {
        this.product = product;
        this.timeLeft = timeLeft;
    }
}

export default ShelfCurrentItem;