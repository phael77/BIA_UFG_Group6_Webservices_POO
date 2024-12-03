from flask import Flask
import os

app = Flask(__name__)
app.secret_key = '1234567890'  # Ensure to set a secret key for session management

# Import routes from the routes file
from app.client import *

if __name__ == "__main__":
    app.run(debug=True)
