(function () {
    'use strict';

    angular
        .module('ABC')
        .controller('MessagesController', MessagesController);

    MessagesController.$inject = ['$rootScope', '$stateParams', '$state', 'MessagesService', '$uibModal'];

    function MessagesController($rootScope, $stateParams, $state, MessagesService, $uibModal) {
        var vm = this;
        vm.messages = [];
        vm.message = {};
        vm.users= [];
        
        vm.itemsPerPageOption = [10, 25, 50 , 100];
        vm.pagination = {
                maxSize: 5,
                itemsPerPage: vm.itemsPerPageOption[0],
                messages: {
                    totalItems: vm.messages.length > 0 ? vm.messages.length : 0,
                    searchQuery: '',
                    pageNumber: 1,
                    sortBy: 'recipient',
                    order: 'ASC'
                }
            };
        
        // public functions
        vm.search = search;
        vm.sort = sort;
        vm.keySearch = keySearch;
        vm.deleteMessage = deleteMessage;
        vm.getMessage = getMessage;
        
        search();
        
        function search() {
        	MessagesService.getMessages(vm.pagination.messages.searchQuery, vm.pagination.messages.pageNumber, vm.pagination.messages.sortBy, vm.pagination.messages.order, vm.pagination.itemsPerPage)
        	.then(function(result){
        		vm.messages = result.data.Sites;
        		
        		vm.pagination = {
                    maxSize: 5,
                    itemsPerPage: vm.pagination.itemsPerPage,
                    messages: {
                        totalItems: vm.messages ? result.data.TotalRows : 0,
                        searchQuery: vm.pagination.messages.searchQuery,
                        pageNumber: vm.pagination.messages.pageNumber,
                        sortBy: vm.pagination.messages.sortBy,
                        order: vm.pagination.messages.order
                    }
                };
        	})
        	.catch(function(error){
        		console.log(error);
        	});
        }
        
        function keySearch(event) {
            if (event.keyCode == 13) {
                search();
            }
        }
        
        function sort(sortBy) {
        	vm.pagination.messages.sortBy = sortBy;
        	vm.pagination.messages.order = vm.pagination.messages.order === 'ASC' ? 'DESC' : 'ASC';
        	search();
        }
        
        function deleteMessage(messageId) {
        	var content = {
                    title: "Delete",
                    body: 'Are you sure you want to delete message? WARNING: This action cannot be reverted.'
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
                    	MessagesService.deleteMessage(messageId)
                    	.then(function(result){
                    		search();
                    	})
                    	.catch(function(error){
                    		console.log(error);
                    	})
                    }
                })
        }

        function getMessage(messageId) {
                var modalInstance = $uibModal.open({
                    controller: 'DetailsController',
                    controllerAs: 'vmDetails',
                    templateUrl: 'js/components/details/details.html',
                    size: 'lg',
                    backdrop: 'static',
                    keyboard: false,
                    resolve: {
                    	MessageDetails: ['MessagesService',
                    		function(MessagesService){
                			return MessagesService.getMessage(messageId)
                		}]
                    }
                })
        }
    }
})();