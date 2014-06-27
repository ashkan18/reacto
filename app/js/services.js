reactoApp.service('ReactoServices', function($http) {
    this.getInbox = function(id) {
        return $http({
            method: 'GET',
            url: '/messages/user/' + id + '/'
        });
    };

    this.authenticate = function(id, name, access_token) {
        $rootScope.id = id;
        return $http.post({
            url:"/users/authenticate/",
            method: 'POST',
            data: {'user_id': userId,
                'name': name,
                'access_token': access_token}
        })
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