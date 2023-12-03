package tech.helen.bookshop.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.data.domain.Pageable;

import tech.helen.bookshop.entity.History;

public interface HistoryRepository extends JpaRepository<History, Long> {
    Page<History> findProductByUserEmail(
            @RequestParam("email") String email,
            Pageable pageable);
}