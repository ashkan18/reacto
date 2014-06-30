var reactoApp = angular.module('ReactoApp', ['ngRoute', 'facebook'])
    .run(['$rootScope', '$window', function($rootScope) {
        $rootScope.user = {};
    }]);

reactoApp.config(['FacebookProvider', function(FacebookProvider) {
    // Here you could set your appId through the setAppId method and then initialize
    // or use the shortcut in the initialize method directly.
    FacebookProvider.init('1471433136431835');
}])


reactoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/authenticate', {
            templateUrl: 'partials/login.html',
            controller: 'AuthController'
        }).
        when('/inbox', {
            templateUrl: 'partials/inbox.html',
            controller: 'InboxController'
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
