package tech.helen.bookshop.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tech.helen.bookshop.dao.CustomOrderRepository;
import tech.helen.bookshop.dao.ProductRepository;
import tech.helen.bookshop.entity.CustomOrder;
import tech.helen.bookshop.entity.Product;

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
}
