package com.project.abc.message;


import org.hibernate.validator.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.project.abc.utility.Messages;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class Message {
    private int messageID;
    
    @NotBlank(message = Messages.Message.FAIL_RECIPIENT_REQUIRED)
    private String recipient;
    
    private String subject;
    
    @NotBlank(message = Messages.Message.FAIL_BODY_REQUIRED)
    private String body;

    private String sender;
    
    @Getter(onMethod = @__(@JsonIgnore))
    @Setter(onMethod = @__(@JsonProperty))

	private boolean isSuccessful;
	private boolean isMessage;
}
