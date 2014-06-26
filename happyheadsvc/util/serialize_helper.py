from bson.json_util import dumps
__author__ = 'Ashkan'


def obj_to_json(obj):
    return dumps(obj.to_json())