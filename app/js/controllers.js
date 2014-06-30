reactoApp.controller('AuthController', function($scope, $rootScope, AuthServices) {

});


/**
 * Inbox controller handles showing message in the inbox for logged in user and also has a method
 * for showing the message details which basically calls Platform.showMessage which calls to the native wrapper
 */
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

/**
 * Friendscrontoller which handles showing the friend list page
 */
reactoApp.controller('FriendsController', function($scope, $rootScope, ReactoServices) {
    ReactoServices.getFriends($rootScope.userId).success(function(data) {
        $rootScope.page_title = 'Friends (' + data.friends.length + ')';
        $scope.friends = data.friends;
    });
});

/**
 * SearchController handles showing the search page and also doing the actual search and showing the results
 */
reactoApp.controller('SearchController', function($scope, $rootScope, ReactoServices) {
    $scope.search = function() {
        ReactoServices.searchUsers($scope.searchQuery).success( function(data) {
           $scope.searchResults = data.results;
        });
    };

    $scope.addFriend = function(friendUserId) {
        ReactoServices.addFriend($rootScope.userId, friendUserId);
    }

});