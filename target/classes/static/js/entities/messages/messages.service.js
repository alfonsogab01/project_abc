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
        		editMessage: editMessage,
        		deleteMessage: deleteMessage,
        		newMessage: newMessage,
        		getActiveMessages: getActiveMessages
        };

        return factory;
        
        
        function getMessages(searchQuery, pageNumber, sortBy, order, limit) {
        	return $http({
                method: 'POST',
                url: 'message/getmessages',
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
                url: 'message/delete/' + encodeURIComponent(messageId)                
            })
        }
        
        function newMessage(message) {
        	return $http({
        		method: 'POST',
        		url: 'message/',
        		data: message
        	})
        }
        
        function getMessage(messageId) {
        	return $http({
        		method: 'GET',
        		url: 'message/' + messageId
        	})
        }
        
        function editMessage(message) {
        	return $http({
        		method: 'PATCH',
        		url: 'message/',
        		data: message
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