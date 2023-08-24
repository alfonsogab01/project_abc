package com.project.abc.message;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.abc.utility.HeaderUtil;
import com.project.abc.utility.Messages;

@RestController
@RequestMapping("/message")
public class MessageResources {

    @Autowired
    private MessageService messageService;

    @RequestMapping(value = "/getmessages", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Object> getMessages(
            @RequestParam(required = true) String searchQuery, 
            @RequestParam(required = true) Integer pageNumber, 
            @RequestParam(required = true) String sortBy, 
            @RequestParam(required = true) String order, 
            @RequestParam(required = true) Integer limit ) throws Exception {
        return messageService.getMessages(searchQuery, pageNumber, sortBy, order, limit);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> addNewMessage(@RequestBody Message message) throws Exception {
        if (!messageService.addNewMessage(message)) {
            return ResponseEntity.badRequest().headers(HeaderUtil.error(Messages.Message.FAIL_NEW_ENTRY)).build();
        }
        return ResponseEntity.ok().headers(HeaderUtil.success(Messages.Message.SUCCESS_NEW_ENTRY)).build();
    }

    @RequestMapping(method = RequestMethod.PATCH)
    public ResponseEntity<Void> updateMessageInfo(@Valid @RequestBody Message message) throws Exception {
        if (!messageService.updateMessageInfo(message)) {
            return ResponseEntity.badRequest().headers(HeaderUtil.error(Messages.Message.FAIL_UPDATE_ENTRY)).build();
        }
        return ResponseEntity.ok().headers(HeaderUtil.success(Messages.Message.SUCCESS_UPDATE_ENTRY)).build();
    }

    @RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
    public ResponseEntity<Void> deleteMessage(@PathVariable("id") Integer messageId) throws Exception {
        if (!messageService.deleteMessage(messageId)) {
            return ResponseEntity.badRequest().headers(HeaderUtil.error(Messages.Message.FAIL_UPDATE_ENTRY)).build();
        }
        return ResponseEntity.ok().headers(HeaderUtil.success(Messages.Message.SUCCESS_DELETE_ENTRY)).build();
    }

    @RequestMapping(value = "{id}", method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Message> getMessage(@PathVariable Integer id) throws Exception {
        Message message = messageService.getMessage(id);
        if (message.getRecipient() == null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.error(Messages.Message.FAIL_MESSAGE_NOT_EXIST)).build();
        } else {
            return ResponseEntity.ok().body(message);
        }
    }
}
