(function () {
    'use strict';

    angular
        .module("ABC")
        .config(stateConfig)

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
    	
        $stateProvider
        .state('dashboard.users',{
            url: '/user',
            controller: 'UsersController',
            controllerAs: 'vm',
            templateUrl: 'js/entities/users/users.html'
        })
        .state('dashboard.messagesnew',{
            url: '/messages/new',
            controller: 'NewMessagesController',
            controllerAs: 'vm',
            templateUrl: 'js/entities/messages/messages-new.html'
        })
    }
})();



