(function () {
    'use strict';

    angular
        .module("ABC")
        .config(stateConfig)

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
    	
        $stateProvider
        .state('dashboard.messages',{
            url: '/message',
            controller: 'MessagesController',
            controllerAs: 'vm',
            templateUrl: 'js/entities/messages/messages.html'
        })
        .state('dashboard.messagesnew',{
            url: '/message/new',
            controller: 'NewMessagesController',
            controllerAs: 'vm',
            templateUrl: 'js/entities/messages/messages-new.html'
        })
        .state('dashboard.messageedit',{
            url: '/messages/:id',
            controller: 'EditMessagesController',
            controllerAs: 'vm',
            templateUrl: 'js/entities/messages/messages-edit.html',
            resolve: {
            	MessageDetails: ['MessagesService', '$stateParams',
            		function(MessagesService, $stateParams){
            			return MessagesService.getMessage($stateParams.id)
            		}]
            }
        })
    }
})();



