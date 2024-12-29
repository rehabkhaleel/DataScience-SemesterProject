from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_db"]
customer_login_collection = db["customer_login"]

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Customer Login API!"})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    customer_id = data.get("username")  # We're using username field for CustomerID
    password = data.get("password")

    if not customer_id or not password:
        return jsonify({"error": "Customer ID and password are required"}), 400

    customer_user = customer_login_collection.find_one({"CustomerID": int(customer_id)})

    if not customer_user:
        return jsonify({"error": "Invalid credentials"}), 401

    if password == customer_user["Password"]:
        return jsonify({
            "message": "Login successful",
            "user": {"CustomerID": customer_user["CustomerID"]}
        }), 200

    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)

