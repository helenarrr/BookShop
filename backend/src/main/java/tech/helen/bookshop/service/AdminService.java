package tech.helen.bookshop.service;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;

import tech.helen.bookshop.dao.*;
import tech.helen.bookshop.entity.Product;
import tech.helen.bookshop.requestmodels.AppendProductRequest;

@Service
@Transactional
public class AdminService {

    private ProductRepository productRepository;
    private ReviewRepository reviewRepository;
    private CustomOrderRepository orderRepository;

    public AdminService(
            ProductRepository productRepository,
            ReviewRepository reviewRepository,
            CustomOrderRepository orderRepository) {
        this.productRepository = productRepository;
        this.reviewRepository = reviewRepository;
        this.orderRepository = orderRepository;
    }

    public void postProduct(AppendProductRequest product) {
        Product item = new Product();
        item.setTitle(product.getTitle());
        item.setCreator(product.getCreator());
        item.setDescription(product.getDescription());
        item.setCopies(product.getCopies());
        item.setCopiesAvailable(product.getCopies());
        item.setCategory(product.getCategory());
        item.setImg(product.getImg());
        productRepository.save(item);
    }

    public void deleteProduct(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);

        if (!product.isPresent()) {
            throw new Exception("Товар отсутствует");
        }

        productRepository.delete(product.get());
        orderRepository.deleteAllByProductId(productId);
        reviewRepository.deleteAllByProductId(productId);
    }

    public void incProductCount(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);
        if (!product.isPresent()) {
            throw new Exception("Товар отсутствует");
        }

        product.get().setCopiesAvailable(product.get().getCopiesAvailable() + 1);
        product.get().setCopies(product.get().getCopies() + 1);

        productRepository.save(product.get());
    }

    public void decProductCount(Long productId) throws Exception {
        Optional<Product> product = productRepository.findById(productId);
        int count = product.get().getCopies();
        if (count == 0)
            return;
        if (!product.isPresent()
                || product.get().getCopiesAvailable() <= 0
                || product.get().getCopies() <= 0) {
            throw new Exception("Товар отсутствует");
        }

        product.get().setCopiesAvailable(product.get().getCopiesAvailable() - 1);
        product.get().setCopies(count - 1);

        productRepository.save(product.get());
    }
}