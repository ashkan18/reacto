
__author__ = 'Ashkan'

from happyheadsvc.services import message_service
from flask import request, jsonify
from happyheadsvc import app


@app.route('/messages/user/<string:user_id>/', methods=['GET'])
def get_inbox(user_id):
    """
    This method returns a list of current messages for a user
    :param user_id: int user identifier of the user we want to get their messages

    curl sample:
        curl -X GET http://localhost:5000/messages/user/1/
    """

    inbox_message_models = message_service.get_inbox(user_id=user_id)
    inbox_messages = [message.to_json() for message in inbox_message_models]
    return jsonify(inbox=inbox_messages)

@app.route('/messages/user/<string:sender_user_id>/friend/<string:receiver_user_id>/', methods=['POST'])
def send_message_to_user(sender_user_id, receiver_user_id):
    """
    This method will send a message to a user
    :param sender_user_id: user id of the sender
    :param receiver_user_id: user id of the received

    curl sample:
        curl -X POST http://localhost:5000/messages/user/1/friend/2 -H "Content-Type: application/json"
            --data '{"text": "Hi Chetori?", "image":""}'
    """
    message_service.send_message(sender_id=sender_user_id, receiver_id=receiver_user_id,
                                 text=request.json['text'],
                                 image=request.json['image'])
    return jsonify(sent=True)


