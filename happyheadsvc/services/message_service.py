import uuid
from happyheadsvc.data.message_data import MessageData
from happyheadsvc.models.message_model import MessageModel

__author__ = 'Ashkan'

__message_data = MessageData()


def send_message(sender_id, receiver_id, text, image):
    """
    This method sends a message from sender to receiver
    :param sender_id: int id of the sender of the message
    :param receiver_id: int id of the receiver of the message
    :param text: String text of the message we send
    :param image: Base64Encoded image we send along the message
    :return: int message id
    """
    message = MessageModel()
    message.id = uuid.uuid4()
    message.sender_id = sender_id
    message.receiver_id = receiver_id
    message.text = text
    message.image = image

    __message_data.add_message(message)


def get_inbox(user_id):
    """
    This method returns list of all the messages that user hasn't seen yet
    :param user_id: int user id of the user we want to get it's messages
    :return: list of current messages
    """
    return __message_data.get_inbox(user_id)






