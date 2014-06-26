reactoApp.service('ReactoServices', function($http) {
    this.getInbox = function(id) {
        return $http({
            method: 'GET',
            url: '/messages/user/' + id + '/'
        });
    };

    this.authenticate = function(id, name, access_token) {
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
            data: {'query': query}
        })
    }
});