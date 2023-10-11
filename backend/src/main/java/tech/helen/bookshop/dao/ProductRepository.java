package tech.helen.bookshop.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import tech.helen.bookshop.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
