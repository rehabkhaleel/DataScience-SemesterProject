from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)

# Allow all origins for development purposes (adjust for production)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_db"]
customer_login_collection = db["customer_login"]

@app.after_request
def handle_cors(response):
    """
    Add CORS headers to handle preflight requests (OPTIONS) and allow cross-origin requests.
    """
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    return response

@app.route('/api/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        # Handle preflight request
        return '', 200

    # Handle POST request for login
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    # Fetch customer data from MongoDB
    customer_user = customer_login_collection.find_one({"CustomerID": username})

    if not customer_user:
        return jsonify({"error": "Invalid credentials"}), 401

    # Verify password
    if password == customer_user["Password"]:
        return jsonify({"message": "Login successful", "user": customer_user["CustomerID"]}), 200

    return jsonify({"error": "Invalid credentials"}), 401

if __name__ == '__main__':
    app.run(debug=True)
