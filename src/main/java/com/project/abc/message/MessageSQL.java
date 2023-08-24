package com.project.abc.message;

public class MessageSQL {

    public static final String RETRIEVE_FILTERED_MESSAGE =
            "SELECT * " +
            "  FROM `message` " + 
            " WHERE concat(`recipient`,`subject`,`body`,`sender`) LIKE ? " +
            " AND recipient = ? " +
            " ORDER BY %s %s " +
            " LIMIT ?, ?";
    
    public static final String RETRIEVE_FILTERED_MESSAGE_COUNT =
            "SELECT count(messageId) " +
            "  FROM `message` " +
            " WHERE concat(`recipient`,`subject`,`body`) LIKE ? " +
            " AND recipient = ? ";
    
    public static final String RETRIEVE_MESSAGE_INFO =
            "SELECT * " +
            "  FROM `message` " +
            " WHERE `recipient` = ?";
    
    public static final String RETRIEVE_MESSAGE_INFO_BY_ID = 
            "SELECT * " +
            "  FROM `message` " +
            " WHERE `messageID` = ?";
    
    public static final String ADD_NEW_MESSAGE = 
            "INSERT INTO `message` ( " +
            "            `recipient` " +
            "            ,`subject` " +
            "            ,`body` " +
            "            ,`sender` " +
            "            ) " +
            "VALUES (?,?,?,?)";
    
    public static final String DELETE_MESSAGE =
            "DELETE FROM `message` WHERE `messageId` = ?";
    
    public static final String UPDATE_MESSAGE_INFO =
            "UPDATE `message` " +
            "   SET `recipient` = ? " +
            "        ,`subject` = ? " +
            "        ,`body` = ? " +
            " WHERE `messageID` = ?";
}
