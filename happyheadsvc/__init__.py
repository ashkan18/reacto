import os
from flask import Flask

__author__ = 'Ashkan'

# create a new flask application
app = Flask(__name__, static_folder='{0}/../app'.format(os.path.dirname(__file__)))
app.debug = True

# log to stderr
import logging
from logging import StreamHandler
file_handler = StreamHandler()
app.logger.setLevel(logging.DEBUG)  # set the desired logging level here
app.logger.addHandler(file_handler)


import interfaces.users_interface
import interfaces.messages_interface