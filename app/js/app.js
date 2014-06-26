var reactoApp = angular.module('ReactoApp', ['ReactoApp.controllers', 'ReactoApp.services', 'ngRoute']);

reactoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/inbox', {
            templateUrl: 'partials/inbox.html',
            controller: 'InboxController'
        }).
        when('/friends', {
            templateUrl: 'partials/friends.html',
            controller: 'FriendsController'
        }).otherwise({
            redirectTo: '/inbox'
        })
}]);
