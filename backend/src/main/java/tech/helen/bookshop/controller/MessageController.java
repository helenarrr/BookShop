package tech.helen.bookshop.controller;

import org.springframework.web.bind.annotation.*;

import tech.helen.bookshop.config.Environment;
import tech.helen.bookshop.entity.Message;
import tech.helen.bookshop.responsemodels.AdminAnswer;
import tech.helen.bookshop.service.MessageService;
import tech.helen.bookshop.utils.JWTParser;

@CrossOrigin(Environment.host)
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messagesService;

    public MessageController(MessageService messagesService) {
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/send/message")
    public void postMessage(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody Message messageRequest) {
        String userEmail = JWTParser.extractEmail(token);
        messagesService.postMessage(messageRequest, userEmail);
    }

    @PutMapping("/secure/admin/message")
    public void putMessage(
            @RequestHeader(value = "Authorization") String token,
            @RequestBody AdminAnswer answer) throws Exception {
        String email = JWTParser.extractEmail(token);
        String admin = JWTParser.extractRole(token);
        if (admin == null
                || !admin.equals("admin")) {
            throw new Exception("Страница только для админа");
        }
        messagesService.putMessage(answer, email);
    }
}
