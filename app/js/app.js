var reactoApp = angular.module('ReactoApp', ['ngRoute'])
    .run(['$rootScope', '$window', 'AuthService', function($rootScope) {
        $rootScope.user = {};

        $window.fbAsyncInit = function() {
            // Executed when the SDK is loaded
            FB.init({
                /*
                 The app id of the web app;
                 To register a new app visit Facebook App Dashboard
                 ( https://developers.facebook.com/apps/ )
                 */
                appId: '***************',

                /*
                 Adding a Channel File improves the performance
                 of the javascript SDK, by addressing issues
                 with cross-domain communication in certain browsers.
                 */
                channelUrl: 'app/channel.html',

                /*
                 Set if you want to check the authentication status
                 at the start up of the app
                 */
                status: true,

                /*
                 Enable cookies to allow the server to access
                 the session
                 */
                cookie: true,

                /* Parse XFBML */
                xfbml: true
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
            redirectTo: '/inbox'
        })
}]);
