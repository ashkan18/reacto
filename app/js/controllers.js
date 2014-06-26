reactoApp.controller('InboxController', function($scope, $rootScope,  ReactoServices) {
    ReactoServices.getInbox($rootScope.userId).success(function(data) {
        console.log('inbox data:' + data);
        $scope.messages = data.inbox;
    });
});

reactoApp.controller('FriendsController', function($scope, $rootScope, ReactoServices) {
    ReactoServices.getFriends($rootScope.userId).success(function(data) {
        console.log('data:' + data);
        $scope.friends = data.friends;
    });
});

reactoApp.controller('SearchController', function($scope, ReactoServices) {

});