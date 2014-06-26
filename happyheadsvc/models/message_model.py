import datetime
from happyheadsvc.models.base_model import BaseModel

__author__ = 'Ashkan'


class MessageModel(BaseModel):
    id = None
    sender_id = None
    receiver_id = None
    text = None
    image = None
    created_date = None
    seen_date = None
    id = None

    def __init__(self, result_row=None):
        self.sender_id = None
        self.receiver_id = None
        self.text = None
        self.image = None
        self.created_date = datetime.datetime.utcnow()
        self.seen_date = None
        self.id = None

        if result_row is not None:
            self.map(result_row)
