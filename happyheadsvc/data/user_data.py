from happyheadsvc.data.base_data import BaseData
from happyheadsvc import app
from happyheadsvc.models.user_model import UserModel

__author__ = 'Ashkan'


class UserData(BaseData):

    def find_user_by_id(self, id):
        """
        Given a user id it will find the user and return it, it returns None if we don't have this user
        :param id:
        :return:
        """
        result_row = self.db.users.find_one({'id': id})
        if result_row is not None:
            return UserModel(result_row=result_row)
        return None

    def add_user(self, user_model):
        """
        This method adds a new user to database
        :param user_model: UserModel object of the user we want to add
        """
        if self.find_user_by_id(user_model.id) is None:
            app.logger.debug(u"Adding user id: {0}".format(user_model.id))
            self.db.users.insert(user_model.to_json())

    def get_friends(self, user_id):
        """
        This method returns list of friends for a user
        :param user_id: id of the user we want to get their friends
        :return: list of friends of this user
        """
        friends = []
        user_info = self.find_user_by_id(user_id)
        if user_info is not None:
            for friend_id in user_info.friends:
                friend_user_model = self.find_user_by_id(friend_id)
                friends.append(friend_user_model)
        return friends

    def update_user(self, user_model):
        """
        Updates an existing user model
        :param user_model: user model of existing user with modified params
        """
        self.db.users.update({'id': user_model.id}, user_model.to_json(), upsert=False)

    def search_by_name(self, name):
        """
        Search users by name and returns a list of users
        :param name: name of the user we are looking for
        :return: users from mongo db
        """
        user_list = []
        search_results = self.db.users.find({'name': {'$regex': name, '$options': 'i'}})
        for row in search_results:
            user_list.append(UserModel(row))
        return user_list