package tech.helen.bookshop.controller;

import org.springframework.web.bind.annotation.*;

import tech.helen.bookshop.config.Environment;
import tech.helen.bookshop.requestmodels.AppendProductRequest;
import tech.helen.bookshop.service.AdminService;
import tech.helen.bookshop.utils.JWTParser;

@CrossOrigin(Environment.host)
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/secure/append/product")
    public void postBook(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody AppendProductRequest product) throws Exception {
        String admin = JWTParser.extractRole(token);
        if (admin == null
                || !admin.equals("admin")) {
            throw new Exception("Вы не администратор");
        }
        adminService.postProduct(product);
    }

    @DeleteMapping("/secure/remove/product")
    public void deleteBook(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long productId) throws Exception {
        String admin = JWTParser.extractRole(token);
        if (admin == null
                || !admin.equals("admin")) {
            throw new Exception("Вы не администратор");
        }
        adminService.deleteProduct(productId);
    }

    @PutMapping("/secure/count/inc")
    public void incBookCount(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long productId) throws Exception {
        String admin = JWTParser.extractRole(token);
        if (admin == null ||
                !admin.equals("admin")) {
            throw new Exception("Вы не администратор");
        }
        adminService.incProductCount(productId);
    }

    @PutMapping("/secure/count/dec")
    public void decBookCount(
            @RequestHeader(value = "Authorization") String token,
            @RequestParam Long productId) throws Exception {
        String admin = JWTParser.extractRole(token);
        if (admin == null
                || !admin.equals("admin")) {
            throw new Exception("Вы не администратор");
        }
        adminService.decProductCount(productId);
    }
}
