var reactoApp = angular.module('ReactoApp', ['ngRoute'])
    .run(function($rootScope) {
        $rootScope.userId = 1;
    });

reactoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/inbox', {
            templateUrl: 'partials/inbox.html',
            controller: 'InboxController'
        }).
        when('/friends', {
            templateUrl: 'partials/friends.html',
            controller: 'FriendsController'
        }).
        otherwise({
            redirectTo: '/inbox'
        })
}]);
