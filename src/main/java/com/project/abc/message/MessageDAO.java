package com.project.abc.message;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.abc.login.LoginResource;
import com.project.abc.user.User;

@Repository
@Transactional(readOnly = false)
public class MessageDAO extends JdbcDaoSupport {

	private JdbcTemplate jdbcTemplate;
	
	@Autowired
    private DataSource dataSource;

    @PostConstruct
    private void initialize() {
        setDataSource(dataSource);
        jdbcTemplate = getJdbcTemplate();
    }

	public Map<String, Object> getMessages(String searchQuery, Integer pageNumber, String sortBy, String order, Integer limit) {
		Integer offset = pageNumber <= 0 ? 0 : (pageNumber - 1) * limit;

		String sql = MessageSQL.RETRIEVE_FILTERED_MESSAGE;
		sql = String.format(sql, sortBy, order);
		User user = LoginResource.getCurrentUserLogin();
		List<Message> messages = jdbcTemplate.query(sql, new BeanPropertyRowMapper<Message>(Message.class), "%" + searchQuery + "%", user.getUserFirstName() , offset, limit);

		sql = MessageSQL.RETRIEVE_FILTERED_MESSAGE_COUNT;
		Integer count = jdbcTemplate.queryForObject(sql, Integer.class, "%" + searchQuery + "%", user.getUserFirstName());

		Map<String, Object> result = new HashMap<>();
		result.put("Sites", messages);
		result.put("TotalRows", count);
		return result;
	}

	public Message retrieveMessageInfo(String recipient) throws Exception {
        Message message = null;
        try {
            String sql = MessageSQL.RETRIEVE_MESSAGE_INFO;
            message = jdbcTemplate.queryForObject(sql, new Object[] { recipient }, new BeanPropertyRowMapper<Message>(Message.class));
            return message;
        } catch (Exception e) {
            throw e;
        }
    }

	public Message retrieveMessageInfo(Integer messageId) throws Exception {
		Message message = null;
		try {
			String sql = MessageSQL.RETRIEVE_MESSAGE_INFO_BY_ID;
			message = jdbcTemplate.queryForObject(sql, new Object[] { messageId }, new BeanPropertyRowMapper<Message>(Message.class));
			return message;
		} catch (Exception e) {
			throw e;
		}
	}

	public boolean addNewMessage(Message message) throws Exception {
		boolean isSuccess = false;
		User user = LoginResource.getCurrentUserLogin();
		try {
			String sql = MessageSQL.ADD_NEW_MESSAGE;
			int returnValue = jdbcTemplate.update(sql,
					new Object[] { message.getRecipient(), message.getSubject(), message.getBody(), user.getUserFirstName()});

			if (returnValue > 0) {
				isSuccess = true;
			}
			return isSuccess;
		} catch (Exception e) {
			throw e;
		}
	}

	public boolean deleteMessage(Integer messageId) throws Exception {
		boolean isSuccess = false;
		try {
			String sql = MessageSQL.DELETE_MESSAGE;
			int returnValue = jdbcTemplate.update(sql, new Object[] { messageId });

			if (returnValue > 0) {
				isSuccess = true;
			}

			return isSuccess;
		} catch (Exception e) {
			throw e;
		}
	}

	public boolean updateMessageInfo(Message message) throws Exception {
		boolean isSuccess = false;
		try {
			String sql = MessageSQL.UPDATE_MESSAGE_INFO;
			int returnValue = jdbcTemplate.update(sql, new Object[] { message.getRecipient(), message.getSubject(), message.getBody(), message.getMessageID() });
			
			if (returnValue > 0) {
				isSuccess = true;
			}

			return isSuccess;
		} catch (Exception e) {
			throw e;
		}
	}

	// public boolean isUsernameExists(User user) {
		// boolean exist = false;
		// try {
			// String sql = UserSQL.IS_USERNAME_EXISTS;
			// int  recordCount = jdbcTemplate.queryForObject(sql, new Object[] { user.getUserName(), user.getUserID() }, Integer.class);
			
			// if (recordCount > 0) {
				// exist = true;
			// }
			
			// return exist;
		// } catch (Exception e) {
			// throw e;
		// }
	// }
}
