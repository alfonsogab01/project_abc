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
    }
})();



