(function () {
    'use strict';

    angular
        .module('ABC')
        .controller('NewMessagesController', NewMessagesController);

    NewMessagesController.$inject = ['$rootScope', '$stateParams', '$state', '$uibModal', 'MessagesService', 'UsersService'];

    function NewMessagesController($rootScope, $stateParams, $state, $uibModal, MessagesService, UsersService) {
        var vm = this;
        
        // variables
        vm.form = {};
        vm.message = {};
        vm.formErrors = [];
        vm.users = [];
        vm.first_names = [];
        
        // public functions
        vm.newMessage = newMessage;
        vm.reset = reset;
        vm.search = search;
        
        search();
        
        function search() {
        	UsersService.retrieveAllUsers()
        	.then(function(result){
        		vm.users = result.data.Sites;
        		angular.forEach(vm.users, function(value, key) {
        			angular.forEach(value, function(val, ky) {
        				  if (ky == "userFirstName"){
        					  if(vm.first_names.length < 12){
        						  vm.first_names.push(val);
        					  }
        				  }
        			});
        		});
        		
        	})
        	.catch(function(error){
        		console.log(error);
        	});
        }

        function newMessage() {
        	if (vm.form.$valid) {
        		var content = {
                    title: "New Message",
                    body: 'Are you sure you want to send new message?'
                };
                var modalInstance = $uibModal.open({
                    controller: 'ConfirmationController',
                    controllerAs: 'vmConfirmation',
                    templateUrl: 'js/components/confirmation/confirmation.html',
                    size: 'md',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                        content: content
                    }
                })

                modalInstance.result.then(function (response) {
                    if (response) {
                    	// submit here
                    	MessagesService.newMessage(vm.message)
                		.then(function(result){
                			$state.go('dashboard.messages');
                		})
                		.catch(function(error){
                			vm.form.$setDirty();
                            vm.formErrors = error.data.errors;
                		})
                    }
                })
        	} else {
        		vm.form.$setDirty();
        	}
        }
        
        function reset() {
        	vm.message = {};
        	vm.form.$setPristine();
        }
        
//        UsersController.$inject = ['$rootScope', '$stateParams', '$state', 'UsersService', '$uibModal'];
//
//        function UsersController($rootScope, $stateParams, $state, UsersService, $uibModal) {
//            
//        }
    }
})();