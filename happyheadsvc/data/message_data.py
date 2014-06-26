from bson.json_util import dumps
from happyheadsvc.data.base_data import BaseData
from happyheadsvc import app
from happyheadsvc.models.message_model import MessageModel

__author__ = 'Ashkan'


class MessageData(BaseData):

    def add_message(self, message):
        """
        This method will add a new message
        :param message: MessageModel of the message we want to add
        :return: boolean showing if adding was successful
        """
        self.db.messages.insert(message)
        return True

    def get_inbox(self, user_id):
        """
        This method returns un-seen messages for specific user
        :param user_id: id of the user we want to get their inbox
        :return: list of messages
        """
        inbox_messages = self.db.messages.find({'receiver_id': user_id, 'seen_date': None})
        inbox = []
        for message in inbox_messages:
            inbox.append(MessageModel(message))

        return inbox
