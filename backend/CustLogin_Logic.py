from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)

# Allow requests from the frontend
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_db"]
customer_login_collection = db["customer_login"]

@app.route('/api/login', methods=['POST'])
def login():
    # Get JSON data from the request
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    # Validate input
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Fetch customer data from MongoDB
    customer_user = customer_login_collection.find_one({"CustomerID": username})

    if not customer_user:
        return jsonify({"error": "Invalid credentials"}), 401

    # Compare the provided password with the one stored in MongoDB
    if password == customer_user["Password"]:
        return jsonify({
            "message": "Login successful",
            "user": {"CustomerID": customer_user["CustomerID"]}
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401


if __name__ == '__main__':
    app.run(debug=True)
