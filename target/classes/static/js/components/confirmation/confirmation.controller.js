(function(){
    "use strict";
    angular
        .module("ABC")
        .controller("ConfirmationController", ConfirmationController);

    ConfirmationController.$inject=['$uibModalInstance', 'MessagesService', 'content'];

    function ConfirmationController($uibModalInstance, MessagesService, content){

        var vm = this;
        vm.confirm = confirm;
        vm.closeModal = closeModal;
        vm.content = content;
        
        function confirm(){
        	$uibModalInstance.close(true);
        }

        function closeModal() {
        	$uibModalInstance.close(false);
        }
    }
})();
