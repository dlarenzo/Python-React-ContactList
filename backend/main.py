
#  IMPORT REQUEST AND JSONIFY(HELPS US TO RETURN JSON RESPONSES)
from flask import request, jsonify
from config import app, db
from models import Contact

# RUN FLASK APP
if __name__ == "__main__":
    # CREATE DATABASE TABLES
    with app.app_context():
        db.create_all()
    app.run(debug=True)



# CREATE
# - We need first_name
# - We need last_name
# - We need email