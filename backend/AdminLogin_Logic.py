from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_db"]
admin_login_collection = db["admin_login"]

@app.route('/api/admin_login', methods=['POST'])
def admin_login():
    data = request.get_json()
    admin_id = data.get("username")
    password = data.get("password")

    if not admin_id or not password:
        return jsonify({"error": "Admin ID and password are required"}), 400

    admin_user = admin_login_collection.find_one({"AdminID": admin_id})

    if not admin_user:
        return jsonify({"error": "Invalid credentials"}), 401

    if password == admin_user["Password"]:
        return jsonify({
            "message": "Admin login successful",
            "user": {"AdminID": admin_user["AdminID"]}
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)

