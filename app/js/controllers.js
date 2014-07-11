reactoApp.controller('AuthController', [
    '$rootScope',
    '$scope',
    '$location',
    '$timeout',
    'Facebook',
    'AuthService',
    function($rootScope, $scope, $location, $timeout, Facebook, AuthService) {

        // Defining user logged status
        $rootScope.logged = false;

        // And some fancy flags to display messages upon user status change
        $scope.byebye = false;
        $scope.salutation = false;

        /**
         * Watch for Facebook to be ready.
         * There's also the event that could be used
         */
        $scope.$watch(
            function() {
                return Facebook.isReady();
            },
            function(newVal) {
                if (newVal)
                    $scope.facebookReady = true;
            }
        );

        /**
         * IntentLogin
         */
        $scope.IntentLogin = function() {
            Facebook.getLoginStatus(function(response) {
                if (response.status == 'connected') {
                    $scope.logged = true;
                    $scope.me();
                }
                else
                    $scope.login();
            });
        };

        /**
         * Login
         */
        $scope.login = function() {
            Facebook.ui(
                {
                    method: 'oauth',
                    display:'async'
                }, function(response) {
                    if (response.status == 'connected') {
                        $rootScope.logged = true;
                        $scope.me();
                    }

                });

            /*Facebook.login(function(response) {
                if (response.status == 'connected') {
                    $rootScope.logged = true;
                    $scope.me();
                }

            });*/

        };

        /**
         * me
         */
        $scope.me = function() {
            Facebook.api('/me', function(response) {
                /**
                 * Using $scope.$apply since this happens outside angular framework.
                 */
                $scope.$apply(function() {
                    $rootScope.user = response;
                    $rootScope.userId = response.id;
                    userId = response.id;
                    fullname = response.name;
                    image =  'https://graph.facebook.com/' + userId + '/picture?type=normal';

                    AuthService.authenticate(userId, fullname, image, '1231321').success( function(data){
                        $location.path( '/inbox');
                    });

                });

            });
        };

        /**
         * Logout
         */
        $scope.logout = function() {
            Facebook.logout(function() {
                $scope.$apply(function() {
                    $scope.user   = {};
                    $scope.logged = false;
                });
            });
        }

        /**
         * Taking approach of Events :D
         */
        $scope.$on('Facebook:statusChange', function(ev, data) {
            console.log('Status: ', data);
            if (data.status == 'connected') {
                $scope.$apply(function() {
                    $scope.salutation = true;
                    $scope.byebye     = false;
                });
            } else {
                $scope.$apply(function() {
                    $scope.salutation = false;
                    $scope.byebye     = true;

                    // Dismiss byebye message after two seconds
                    $timeout(function() {
                        $scope.byebye = false;
                    }, 2000)
                });
            }


        });


    }
]);

/**
 * Inbox controller handles showing message in the inbox for logged in user and also has a method
 * for showing the message details which basically calls Platform.showMessage which calls to the native wrapper
 */
reactoApp.controller('InboxController', function($scope, $rootScope,  ReactoServices) {
    if ($rootScope.checkAuth()) {
        ReactoServices.getInbox($rootScope.userId).success(function(data) {
            $rootScope.page_title = 'Inbox (' + data.inbox.length + ')';
            $scope.messages = data.inbox;
        });
    }
    $scope.showMessage = function(messageId) {
        // in this method we will make jsbridge call to open the message and take picture in native app
        Platform.showMessageAndTakePhoto(messageId);
    }
});

/**
 * Friendscrontoller which handles showing the friend list page
 */
reactoApp.controller('FriendsController', function($scope, $rootScope, ReactoServices) {
    if ($rootScope.checkAuth()) {
        ReactoServices.getFriends($rootScope.userId).success(function(data) {
            $rootScope.page_title = 'Friends (' + data.friends.length + ')';
            $scope.friends = data.friends;
        });
    }
});

/**
 * SearchController handles showing the search page and also doing the actual search and showing the results
 */
reactoApp.controller('SearchController', function($scope, $rootScope, ReactoServices) {
    $scope.search = function() {
        if ($rootScope.checkAuth()) {
            ReactoServices.searchUsers($rootScope.userId, $scope.searchQuery).success( function(data) {
               $scope.searchResults = data.results;
            });
        }
    };

    $scope.addFriend = function(friendUserId) {
        if ($rootScope.checkAuth()) {
            ReactoServices.addFriend($rootScope.userId, friendUserId);
        }
    }
});