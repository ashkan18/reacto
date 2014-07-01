reactoApp.service('AuthService', function($http) {
    this.authenticate = function(userId, name, image, access_token) {
        return $http({
            url:"/users/authenticate/",
            method: 'POST',
            data: {'user_id': userId,
                   'name': name,
                   'access_token': access_token,
                   'image': image}
        })
    };

});

reactoApp.service('ReactoServices', function($http) {
    this.getInbox = function(userId) {
        return $http({
            method: 'GET',
            url: '/messages/user/' + userId + '/'
        });
    };

    this.getFriends = function(userId) {
        return $http({
            url: "/users/" + userId +"/friends/",
            method: 'GET'
        })
    };

    this.searchUsers = function(userId, query) {
        return $http({
            method: 'GET',
            url: "/users/"+ userId + "/search/",
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