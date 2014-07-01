from flask import request, jsonify
from happyheadsvc import app
from happyheadsvc.services import user_service


@app.route('/users/authenticate/', methods=['POST'])
def authenticate():
    """
    This method will authenticate the user based on input params

    curl sample:
        curl -X POST http://localhost:5000/users/authenticate -H "Content-Type: application/json"
            --data '{"user_id": "111222333", "access_token":"123123", "name":"Ashkan Nasseri", "image":"image_url"}'

    """
    user_id = request.json['user_id']
    access_token = request.json['access_token']
    name = request.json['name']
    image = request.json['image']

    user_service.authenticate_user(user_id=user_id, access_token=access_token, name=name, image=image)
    return jsonify(sucess=True)


@app.route('/users/<string:user_id>/search/', methods=['GET'])
def search_users(user_id):
    """
    This method searches for users by name based on the query input

    curl sample:
        curl -X GET http://localhost:5000/users/1/search?query=ashkan
    """
    query = request.args['query']
    search_results_user_models = user_service.search_users(user_id, query)
    search_results = [user.to_json() for user in search_results_user_models]
    return jsonify(results=search_results)


@app.route('/users/<string:user_id>/friends/', methods=['GET'])
def get_friends(user_id):
    """
    This method returns list of friends for a user
    :param user_id: id of the user we are looking for

    curl sample:
        curl -X GET http://localhost:5000/users/1/friends/
    """
    friends_models = user_service.get_friends(user_id)
    friends = [friend.to_json() for friend in friends_models]
    return jsonify(friends=friends)


@app.route('/users/<string:user_id>/friend/<string:friend_user_id>', methods=['POST'])
def add_friend(user_id, friend_user_id):
    """
    This method will add a friend to existing user
    :param user_id: the id of the user we want to add friend to
    :param friend_user_id: friend user id

    curl sample:
        curl -X POST http://localhost:5000/users/1/friend/2
    """
    user_service.add_friend(user_id=user_id, friend_user_id=friend_user_id)
    return jsonify(added=True)
