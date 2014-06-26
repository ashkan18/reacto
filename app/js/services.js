angular.module('ReactoApp.services', []).factory('reactoAPIService', function($http) {
    var reactoAPI = {};

    reactoAPI.getInbox = function(id) {
        return $http({
            method: 'GET',
            url: '/messages/user/' + id + '/'
        });
    };

    reactoAPI.authenticate = function(id, name, access_token) {
        return $http.post({
            url:"/users/authenticate/",
            method: 'POST',
            data: {'user_id': userId,
                   'name': name,
                   'access_token': access_token}
        })
    };

    reactoAPI.getFriends = function(id) {
        return $http.get({
            url: "/users/" + id +"/friends/",
            method: 'GET'
        })
    }

    return reactoAPI;
});