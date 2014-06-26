import os
from urlparse import urlparse
import pymongo
from happyheadsvc import app

__author__ = 'Ashkan'


def make_data_connection():
    """
    Creates connection to SQLAlchemy engine, which is the connection to the connection pool.
    This will be called when this module is instantiated, which usually happens once per process,
    except when processes are forked (e.g. worker jobs).

    When a process is forked, a new connection must be made to SQLAlchemy because the connection
    does not span across forked processes. This can result in some pretty nasty behavior, such
    as causing SSL to fail (e.g. no connection to the server, SSL SYSCALL error: EOF detected,
    or bad record mac). More details:
        http://docs.sqlalchemy.org/ru/latest/core/connections.html
        https://devcenter.heroku.com/articles/forked-pg-connections
    """

    global _db  # pylint: disable=W0603

    MONGO_URL = os.environ.get('MONGOHQ_URL')

    if MONGO_URL:
        app.logger.info(u"Use environment mongo")
        # Get a connection
        conn = pymongo.Connection(MONGO_URL)
        # Get the database
        _db = conn[urlparse(MONGO_URL).path[1:]]
    else:
        # Not on an app with the MongoHQ add-on, do some localhost action
        app.logger.info(u"Use Local mongo")
        conn = pymongo.Connection('localhost', 27017)
        _db = conn.reacto

_db = None  # pylint: disable=C0103
make_data_connection()


class BaseData(object):

    def __init__(self):
        self.db = _db
