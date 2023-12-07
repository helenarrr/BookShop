package tech.helen.bookshop.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import tech.helen.bookshop.dao.MessageRepository;
import tech.helen.bookshop.entity.Message;
import tech.helen.bookshop.responsemodels.AdminAnswer;

import java.util.Optional;

@Service
@Transactional
public class MessageService {

    private MessageRepository messageRepository;

    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void postMessage(Message messageRequest, String userEmail) {
        Message message = new Message(
                messageRequest.getTitle(),
                messageRequest.getUserText());
        message.setUserEmail(userEmail);
        messageRepository.save(message);
    }

    public void putMessage(
            AdminAnswer adminQuestionRequest,
            String userEmail) throws Exception {
        Optional<Message> message = messageRepository.findById(
                adminQuestionRequest.getId());

        if (!message.isPresent()) {
            throw new Exception("Ошибка сообщений");
        }

        message.get().setAdminEmail(userEmail);
        message.get().setAdminText(adminQuestionRequest.getText());
        message.get().setClosed(true);
        messageRepository.save(message.get());
    }
}