
#  IMPORT REQUEST AND JSONIFY(HELPS US TO RETURN JSON RESPONSES)
from flask import request, jsonify
from config import app, db
from models import Contact

#GET METHOD
@app.route("/contacts", methods=["GET"])
def get_contacts():
    # QUERY DATABASE FOR ALL CONTACTS
    contacts = Contact.query.all()
    # CONVERT ALL CONTACTS TO JSON
    json_contacts = list(map(lambda contact: contact.to_json(), contacts))
    # RETURN JSON RESPONSE
    return jsonify({"contacts": json_contacts})
  
# CREATE (POST) METHOD
@app.route("/create_contact", methods=["POST"])
def create_contact():
  # Log the incoming request data
  print("Request JSON:", request.json)
    
  # GET DATA FROM REQUEST
  first_name = request.json["firstName"]
  last_name = request.json["lastName"]
  email = request.json["email"]
  
  #  CHECK IF DATA EXISTS IF NOT ERROR MESSAGE
  if not first_name or not last_name or not email:
    return (
      jsonify({"message": "Missing data! Please make sure to fill out all fields"}), 400,
    )
    
  # CREATE NEW CONTACT WITH DATA
  new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
  # ADD NEW CONTACT TO DATABASE
  try:
    db.session.add(new_contact)
    db.session.commit()
  except Exception as e:
    return jsonify({"message": str(e)}), 400
  
  return jsonify({"message": "Contact created successfully!", "contact": new_contact.to_json()}), 201

# UPDATE METHOD
@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
  contact = Contact.query.get(user_id)
  
  if not contact:
    return jsonify({"message": "Contact not found!"}), 404
  
  # DATA FOUND REQUEST
  # data = request.json
  first_name = request.json.get("firstName")
  last_name = request.json.get("lastName")
  email = request.json.get("email")
  
  # UPDATE ANY OF THE INFORMATION THAT MAY HAVE CHANGED IN DATA BELOW
  # contact.first_name = data.get("first_name", contact.first_name)
  # contact.last_name = data.get("last_name", contact.last_name)
  # contact.email = data.get("email", contact.email)
  contact.first_name = first_name
  contact.last_name = last_name
  contact.email = email
  
  # COMMIT CHANGES TO DATABASE
  # db.session.commit()
  # return jsonify({"message": "Contact updated successfully"}), 201
  try:
      db.session.commit()
  except Exception as e:
      return jsonify({"message": str(e)}), 400
  
  return jsonify({"message": "Contact updated successfully!", "contact": contact.to_json()}), 200


# DELETE METHOD
@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
  contact = Contact.query.get(user_id)
  
  if not contact:
    return jsonify({"message": "Contact not found!"}), 404

  # DELETE CONTACT
  db.session.delete(contact)
  db.session.commit()
  
  return jsonify({"message": "Contact deleted successfully"}), 200

# RUN FLASK APP
if __name__ == "__main__":
    # CREATE DATABASE TABLE IF IT DOESN'T EXIST
    with app.app_context():
        db.create_all()
    app.run(debug=True)



# CREATE
# - We need first_name
# - We need last_name
# - We need email



# #region
# #endregion