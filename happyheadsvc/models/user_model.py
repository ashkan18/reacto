import datetime
from happyheadsvc.models.base_model import BaseModel

__author__ = 'Ashkan'


class UserModel(BaseModel):
    id = None
    name = None
    image = None
    created_date = None
    friends = []

    def __init__(self, result_row=None):
        self.id = None
        self.name = None
        self.image = None
        self.friends = []
        self.created_date = datetime.datetime.utcnow()

        if result_row is not None:
            # creating model from result row
            self.map(result_row)
