var reactoApp = angular.module('ReactoApp', ['ngRoute'])
    .run(['$rootScope', '$window', 'AuthService', function($rootScope, $window, AuthService) {
        $rootScope.user = {};

        $window.fbAsyncInit = function() {
            // Executed when the SDK is loaded
            FB.init({
                appId: '1471433136431835',
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.0', // use version 2.0
                channelUrl: 'app/channel.html',
                /*
                 Set if you want to check the authentication status
                 at the start up of the app
                 */
                status: true
            });
            AuthService.watchLoginChange();

        };

        // Are you familiar to IIFE ( http://bit.ly/iifewdb ) ?

        (function(d){
            // load the Facebook javascript SDK

            var js,
                id = 'facebook-jssdk',
                ref = d.getElementsByTagName('script')[0];

            if (d.getElementById(id)) {
                return;
            }

            js = d.createElement('script');
            js.id = id;
            js.async = true;
            js.src = "//connect.facebook.net/en_US/all.js";

            ref.parentNode.insertBefore(js, ref);

        }(document));

    }]);

reactoApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/authenticate', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
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
