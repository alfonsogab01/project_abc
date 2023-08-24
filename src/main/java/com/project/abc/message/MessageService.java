package com.project.abc.message;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

	private Message message;

	@Autowired
	private MessageDAO messageDAO;

	private boolean success;

	public Map<String, Object> getMessages(String searchQuery, Integer pageNumber, String sortBy, String order, Integer limit) {
		Map<String, Object> messages = new HashMap<>();
		try {
			messages = messageDAO.getMessages(searchQuery, pageNumber, sortBy, order, limit);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return messages;
	}

	public Message retrieveMessageInfo(String recipient) {
		message = null;
		try {
			message = messageDAO.retrieveMessageInfo(recipient);
			if (message != null) {
				message.getRecipient();
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return message;
	}

	public boolean addNewMessage(Message message) {
		success = false;
		try {
			success = messageDAO.addNewMessage(message);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return success;
	}

	public boolean deleteMessage(Integer messageId) {
		success = false;
		try {
			success = messageDAO.deleteMessage(messageId);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return success;
	}

	public boolean updateMessageInfo(Message message) {
		success = false;
		try {
			success = messageDAO.updateMessageInfo(message);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return success;
	}

	public Message getMessage(Integer id) {
		Message message = new Message();

		try {
			message = messageDAO.retrieveMessageInfo(id);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return message;
	}
}
