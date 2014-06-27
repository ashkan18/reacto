reactoApp.controller('InboxController', function($scope, $rootScope,  ReactoServices) {
    ReactoServices.getInbox($rootScope.userId).success(function(data) {
        $rootScope.page_title = 'Inbox (' + data.inbox.length + ')';
        $scope.messages = data.inbox;
    });

    $scope.showMessage = function(messageId) {
        // in this method we will make jsbridge call to open the message and take picture in native app
        Platform.showMessageAndTakePhoto(messageId);
    }
});

reactoApp.controller('FriendsController', function($scope, $rootScope, ReactoServices) {
    ReactoServices.getFriends($rootScope.userId).success(function(data) {
        $rootScope.page_title = 'Friends (' + data.friends.length + ')';
        $scope.friends = data.friends;
    });
});

reactoApp.controller('SearchController', function($scope, ReactoServices) {
    $scope.search = function() {
        ReactoServices.searchUsers($scope.searchQuery).success( function(data) {
           $scope.searchResults = data.results;
        });
    };

    $scope.addFriend = function(friendUserId) {
        ReactoServices.addFriend($rootScope.userId, friendUserId);
    }

});