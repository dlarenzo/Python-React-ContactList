
#  IMPORT REQUEST AND JSONIFY(HELPS US TO RETURN JSON RESPONSES)
from flask import request, jsonify
from config import app, db
from models import Contact


@app.route("/contacts", methods=["GET"])

# RUN FLASK APP
if __name__ == "__main__":
    # CREATE DATABASE TABLE IF IT DOESN'T EXIST
    with app.app_context():
        db.create_all()
    app.run(debug=True)

#GET METHOD
@app.route("/contacts", methods=["GET"])
def get_contacts():
    # QUERY DATABASE FOR ALL CONTACTS
    contacts = Contact.query.all()
    # CONVERT ALL CONTACTS TO JSON
    json_contacts = map(lambda x: x.to_json(), contacts)
    # RETURN JSON RESPONSE
    return jsonify(contacts_json)

# CREATE
# - We need first_name
# - We need last_name
# - We need email