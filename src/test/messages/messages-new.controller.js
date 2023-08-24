(function () {
    'use strict';

    angular
        .module('ABC')
        .controller('NewMessagesController', NewMessagesController);

    NewMessagesController.$inject = ['$state', '$uibModal', 'MessagesService'];

    function NewMessagesController($state, $uibModal, MessagesService) {
        var vm = this;
        
        // variables
        vm.form = {};
        vm.user = {};
        vm.formErrors = [];
        
        // public functions
        vm.newMessage = newMessage;
        vm.reset = reset;

        function newMessage() {
        	if (vm.form.$valid) {
        		var content = {
                    title: "New Message",
                    body: 'Are you sure you want to add new message?'
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
    }
})();