from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# INITIALIZE FLASK APP
app = Flask(__name__)

# WRAP THE APP WITH CORS (ENABLES CROSS ORIGIN RESOURCE SHARING)
CORS(app)



# INITIALIZE DATABASE 
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"

# DON'T TRACK MODIFICATIONS
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# CREATE INSTANCE OF DATABASE WHICH ALLOWS US TO INTERACT WITH DATABASE AND DO CRUD OPERATIONS
db = SQLAlchemy(app)