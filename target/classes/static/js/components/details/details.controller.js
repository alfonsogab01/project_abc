(function(){
    "use strict";
    angular
        .module("ABC")
        .controller("DetailsController", DetailsController);

    DetailsController.$inject=['$uibModalInstance', 'MessagesService', 'MessageDetails'];

    function DetailsController($uibModalInstance, MessagesService, MessageDetails){

        var vm = this;
        vm.confirm = confirm;
        vm.closeModal = closeModal;
        vm.content = MessageDetails;
        vm.message = {};
        
        angular.copy(vm.content.data, vm.message);
        
        vm.message.body;
        
        function confirm(){
        	$uibModalInstance.close(true);
        }

        function closeModal() {
        	$uibModalInstance.close(false);
        }
        
        
    }
})();
