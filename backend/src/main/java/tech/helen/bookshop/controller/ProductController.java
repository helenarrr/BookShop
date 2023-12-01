package tech.helen.bookshop.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import tech.helen.bookshop.config.Environment;
import tech.helen.bookshop.entity.Product;
import tech.helen.bookshop.responsemodels.ShelfProductResponseModel;
import tech.helen.bookshop.service.ProductService;
import tech.helen.bookshop.utils.JWTParser;

@CrossOrigin(Environment.host)
@RestController
@RequestMapping("/api/products")
public class ProductController {

  private ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  private String extractEmail(String token, String string) {
    String email = JWTParser.jwtExtraction(token, "\"sub\"");
    if (email != null)
      return email;
    return "";
  }

  @PutMapping("/secure/order")
  public Product orderProduct(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long productId) throws Exception {
    String userEmail = extractEmail(token, "\"sub\"");
    return productService.orderProduct(userEmail, productId);
  }

  @GetMapping("/secure/isorder/byuser")
  public Boolean CustomOrderProductByUser(
      @RequestHeader(value = "Authorization") String token,
      @RequestParam Long productId) {
    String userEmail = extractEmail(token, "\"sub\"");
    return productService.orderProductByUser(userEmail, productId);
  }

  @GetMapping("/secure/currentorder/count")
  public int currentCustomOrderCount(
      @RequestHeader(value = "Authorization") String token) {
    String userEmail = extractEmail(token, "\"sub\"");
    return productService.currentOrderCount(userEmail);
  }

  @GetMapping("/secure/shelfproducts")
  public List<ShelfProductResponseModel> currentItemShelf(
      @RequestHeader(value = "Authorization") String token)
      throws Exception {
    String userEmail = extractEmail(token, "\"sub\"");
    return productService.currentProductsOnShelf(userEmail);
  }

  @GetMapping("/secure/shelfproducts/count")
  public int currentItemShelfCount(
      @RequestHeader(value = "Authorization") String token) {
    String userEmail = extractEmail(token, "\"sub\"");
    return productService.currentCountProductsOnShelf(userEmail);
  }
}