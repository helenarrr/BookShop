package tech.helen.bookshop.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tech.helen.bookshop.dao.CustomOrderRepository;
import tech.helen.bookshop.dao.ProductRepository;
import tech.helen.bookshop.entity.CustomOrder;
import tech.helen.bookshop.entity.Product;
import tech.helen.bookshop.responsemodels.ShelfProductResponseModel;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;
    private CustomOrderRepository customOrderRepository;

    public ProductService(
            ProductRepository productRepository,
            CustomOrderRepository customOrderRepository) {
        this.productRepository = productRepository;
        this.customOrderRepository = customOrderRepository;
    }

    public Product orderProduct(String userEmail, Long productId)
            throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        CustomOrder validate = customOrderRepository
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

        customOrderRepository.save(order);

        return product.get();
    }

    public Boolean CustomOrderProductByUser(String userEmail, Long productId) {
        CustomOrder validate = customOrderRepository
                .findByUserEmailAndProductId(userEmail, productId);
        return validate != null;
    }

    public int currentCustomOrderCount(String userEmail) {
        return customOrderRepository
                .findProductByUserEmail(userEmail).size();
    }

    public List<ShelfProductResponseModel> currentProductsOnShelf(String userEmail) throws Exception {

        List<ShelfProductResponseModel> shelfResponses = new ArrayList<>();
        List<CustomOrder> orders = customOrderRepository.findProductByUserEmail(userEmail);
        List<Long> productsId = new ArrayList<>();

        for (CustomOrder order : orders) {
            productsId.add(order.getProductId());
        }
        List<Product> products = productRepository.findProductByProductIds(productsId);
        SimpleDateFormat date = new SimpleDateFormat("dd-MM-yyyy");

        for (Product product : products) {
            Optional<CustomOrder> order = orders
                    .stream()
                    .filter(x -> x.getProductId() == product.getId())
                    .findFirst();

            if (order.isPresent()) {

                Date d1 = date.parse(order.get().getReturnDate());
                Date d2 = date.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long diff = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                shelfResponses.add(
                        new ShelfProductResponseModel(product, (int) diff));

            }
        }
        return shelfResponses;

    }

    public int currentCountProductOnShelf(String userEmail) {
        return customOrderRepository.findProductByUserEmail(userEmail).size();
    }
}
