var reactoControllers = angular.module('ReactoApp.controllers', []);

reactoControllers.controller('InboxController', [function($scope, reactoAPIService) {
    reactoAPIService.getInbox($rootScope.user_id).success(function(data) {
        console.log('inbox data:' + data);
    });
}]);

reactoControllers.controller('FriendsController', [function($scope, reactoAPIService) {
    reactoAPIService.getFriends($rootScope.user_id).success(function(data) {
       console.log('data:' + data);
    });
}]);