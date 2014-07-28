var reactoApp = angular.module('ReactoApp', ['ngRoute', 'facebook', 'firebase'])
    .run(['$rootScope', '$location', function($rootScope, $location) {
        $rootScope.user = {};
        $rootScope.userId = null;

        // $rootScope.checkAuth = function() {
        //     if ($rootScope.userId === null) {
        //         // user is not authenticated, go to login
        //         $location.path('/authenticate');
        //         return false;
        //     }
        //     return true;
        // };
    }]);

reactoApp.config(['FacebookProvider', function(FacebookProvider) {
    // Here you could set your appId through the setAppId method and then initialize
    // or use the shortcut in the initialize method directly.
    FacebookProvider.init('1471433136431835');
}]);

reactoApp.factory("FirebaseService", ["$firebase", function($firebase) {
  var ref = new Firebase("https://happyhead.firebaseio.com");
  return $firebase(ref);
}]);


reactoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/authenticate', {
            templateUrl: 'partials/login.html',
            controller: 'AuthController'
        }).
        when('/fblogin/:userId/:name/', {
           templateUrl: 'partials/fblogin.html',
           controller: 'LoginController'
        }).
        when('/inbox', {
            templateUrl: 'partials/inbox.html',
            controller: 'InboxController'
        }).
        when('/compose', {
            templateUrl: 'partials/compose.html',
            controller: 'ComposeController'
        }).
        when('/friends', {
            templateUrl: 'partials/friends.html',
            controller: 'FriendsController'
        }).
        when('/search', {
            templateUrl: 'partials/search.html',
            controller: 'SearchController'
        }).
        otherwise({
            redirectTo: '/authenticate'
        })
}]);
