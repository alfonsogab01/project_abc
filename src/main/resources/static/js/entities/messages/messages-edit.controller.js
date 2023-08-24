(function () {
    'use strict';

    angular
        .module('ABC')
        .controller('EditMessagesController', EditMessagesController);

    EditMessagesController.$inject = ['$state', '$uibModal', 'MessagesService', 'MessageDetails'];

    function EditMessagesController($state, $uibModal, MessagesService, MessageDetails) {
        var vm = this;
        
        // variables
        vm.form = {};
        vm.message = {};
        vm.formErrors = [];
        
        // initialize
        angular.copy(MessageDetails.data, vm.message);
        
        // public functions
        vm.editMessage = editMessage;
        vm.reset = reset;

        function editMessage() {
            if (vm.form.$valid) {
                var content = {
                    title: "Edit",
                    body: 'Are you sure you want to edit message?'
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
                    	MessagesService.editMessage(vm.message)
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
            angular.copy(MessageDetails.data, vm.message);
            vm.form.$setPristine();
        }
    }
})();