package tech.helen.bookshop.service;

import tech.helen.bookshop.dao.*;
import tech.helen.bookshop.entity.*;
import tech.helen.bookshop.responsemodels.ShelfProductResponseModel;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;
    private CustomOrderRepository orderRepository;
    private HistoryRepository historyRepository;

    public ProductService(
            ProductRepository productRepository,
            CustomOrderRepository orderRepository,
            HistoryRepository historyRepository) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.historyRepository = historyRepository;
    }

    public Product orderProduct(String userEmail, Long productId)
            throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        CustomOrder validate = orderRepository
                .findByUserEmailAndProductId(userEmail, productId);

        if (!product.isPresent()
                || validate != null
                || product.get().getCopiesAvailable() <= 0) {
            throw new Exception("Ошибка");
        }

        product.get().setCopiesAvailable(product.get().getCopiesAvailable() - 1);
        productRepository.save(product.get());

        CustomOrder order = new CustomOrder(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                product.get().getId());

        orderRepository.save(order);

        return product.get();
    }

    public Boolean orderProductByUser(String userEmail, Long productId) {
        CustomOrder validate = orderRepository
                .findByUserEmailAndProductId(userEmail, productId);
        return validate != null;
    }

    public int currentOrderCount(String userEmail) {
        return orderRepository.findProductByUserEmail(userEmail).size();
    }

    public List<ShelfProductResponseModel> currentProductsOnShelf(String userEmail)
            throws Exception {
        List<ShelfProductResponseModel> shelfResponses = new ArrayList<>();
        List<CustomOrder> orders = orderRepository.findProductByUserEmail(userEmail);
        List<Long> productsId = new ArrayList<>();

        for (CustomOrder order : orders) {
            productsId.add(order.getProductId());
        }

        List<Product> products = productRepository.findProductByProductIds(productsId);
        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");

        for (Product product : products) {
            Optional<CustomOrder> order = orders
                    .stream()
                    .filter(x -> x.getProductId() == product.getId())
                    .findFirst();

            if (order.isPresent()) {

                Date d1 = date.parse(order.get().getReturnDate());
                Date d2 = date.parse(order.get().getOrderDate());

                TimeUnit time = TimeUnit.DAYS;

                long diff = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);
                shelfResponses.add(
                        new ShelfProductResponseModel(product, (int) diff));
            }
        }
        return shelfResponses;
    }

    public int currentCountProductsOnShelf(String userEmail) {
        return orderRepository.findProductByUserEmail(userEmail).size();
    }

    public void returnProduct(String userEmail, Long productId) throws Exception {

        Optional<Product> product = productRepository.findById(productId);

        CustomOrder validateCheckout = orderRepository.findByUserEmailAndProductId(
                userEmail,
                productId);

        if (!product.isPresent() || validateCheckout == null) {
            throw new Exception("Операция невозможна");
        }

        product.get().setCopiesAvailable(product.get().getCopiesAvailable() + 1);

        productRepository.save(product.get());
        orderRepository.deleteById(validateCheckout.getId());

        History history = new History(
                userEmail,
                validateCheckout.getOrderDate(),
                LocalDate.now().toString(),
                product.get().getTitle(),
                product.get().getCreator(),
                product.get().getDescription(),
                product.get().getImg());

        historyRepository.save(history);
    }

    public void renewProduct(String userEmail, Long productId) throws Exception {

        CustomOrder validate = orderRepository.findByUserEmailAndProductId(
                userEmail,
                productId);

        if (validate == null) {
            throw new Exception("Операция невозможна");
        }

        SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = date.parse(validate.getReturnDate());
        Date d2 = date.parse(LocalDate.now().toString());
        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            validate.setReturnDate(LocalDate.now().plusDays(3).toString());
            orderRepository.save(validate);
        }
    }
}
