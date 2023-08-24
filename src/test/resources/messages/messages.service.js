(function () {
    'use strict';

    angular
        .module('ABC')
        .factory('MessagesService', MessagesService);

    MessagesService.$inject = ['$http'];

    function MessagesService($http) {

        var factory = {
        		getMessages: getMessages,
        		getMessage: getMessage,
        		deleteMessage: deleteMessage,
        		newMessage: newMessage,
        		getActiveMessages: getActiveMessages
        };

        return factory;
        
        
        function getMessages(searchQuery, pageNumber, sortBy, order, limit) {
        	return $http({
                method: 'POST',
                url: 'messages/getmessages',
                params: {
                	searchQuery: searchQuery,
                	pageNumber: pageNumber,
                	sortBy: sortBy,
                	order: order,
                	limit: limit	
                }
            })
        }
        
        function deleteMessage(messageId) {
            return $http({
                method: 'POST',
                url: 'messages/delete/' + encodeURIComponent(messageId)                
            })
        }
        
        function newMessage(message) {
        	return $http({
        		method: 'POST',
        		url: 'messages/',
        		data: message
        	})
        }
        
        function getMessage(id) {
        	return $http({
        		method: 'GET',
        		url: 'messages/' + id
        	})
        }
        
        function getActiveMessages() {
        	return $http({
        		method: 'GET',
        		url: 'message/active'
        	})
        }
    }
})();