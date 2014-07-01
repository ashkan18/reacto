from happyheadsvc.data.user_data import UserData
from happyheadsvc.models.user_model import UserModel
from happyheadsvc import app

__author__ = 'Ashkan'


__user_data = UserData()


def authenticate_user(user_id, access_token, name, image=None):
    user_model = UserModel()
    user_model.id = user_id
    user_model.name = name
    user_model.image = image

    user_exits = __user_data.find_user_by_id(user_model.id)
    app.logger.info(u"Looking for user: {0}".format(user_exits))
    if user_exits:
        app.logger.info(u"Found user, don't register id: {0}".format(user_id))
        return True
    else:
        # we need to add the user
        __user_data.add_user(user_model)
        app.logger.info(u"Created user id: {0}".format(user_id))
        return True


def search_users(user_id, name):
    return __user_data.search_by_name(user_id, name)


def get_friends(user_id):
    return __user_data.get_friends(user_id)


def add_friend(user_id, friend_user_id):
    user = __user_data.find_user_by_id(user_id)
    user.friends.append(friend_user_id)
    __user_data.update_user(user)

    # we need to add this user to friend as well
    friend = __user_data.find_user_by_id(friend_user_id)
    friend.friends.append(user_id)
    __user_data.update_user(friend)

