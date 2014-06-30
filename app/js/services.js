reactoApp.service('AuthService', function($http) {
    this.authenticate = function(id, name, image, access_token) {
        $rootScope.id = id;
        return $http.post({
            url:"/users/authenticate/",
            method: 'POST',
            data: {'user_id': userId,
                   'name': name,
                   'access_token': access_token,
                   'image': image}
        })
    };

    this.watchLoginChange = function() {

        FB.Event.subscribe('auth.authResponseChange', function(response) {

            if (response.status === 'connected') {

                /*
                 The user is already logged,
                 is possible retrieve his personal info
                 */
                this.getUserInfo();

                /*
                 This is also the point where you should create a
                 session for the current user.
                 For this purpose you can use the data inside the
                 response.authResponse object.
                 */

            }
            else {

                /*
                 The user is not logged to the app, or into Facebook:
                 destroy the session on the server.
                 */

            }

        });
    }

    this.getUserInfo = function() {

        FB.api('/me', function(response) {

            console.log(response);
            userId = response.id;
            userName = response.name;
            image =  'https://graph.facebook.com/' + userId + '/picture?type=normal';

            this.authenticate(userId, name, image, '1231321');

        });

    }
});

reactoApp.service('ReactoServices', function($http) {
    this.getInbox = function(id) {
        return $http({
            method: 'GET',
            url: '/messages/user/' + id + '/'
        });
    };

    this.getFriends = function(id) {
        return $http({
            url: "/users/" + id +"/friends/",
            method: 'GET'
        })
    };

    this.searchUsers = function(query) {
        return $http({
            method: 'GET',
            url: "/users/search/",
            params: {'query': query}
        })
    }

    this.addFriend = function(userId, friendUserId) {
        return $http({
            method: 'POST',
            url: '/users/' + userId + '/friend/' + friendUserId
        });
    }
});