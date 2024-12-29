from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["telecom_database"]
customer_login_collection = db["customer_logins"]

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Customer Login API!"})

@app.route('/api/login', methods=['POST'])
def login():
    print("Request received at /api/login")
    print("Request data:", request.get_json())
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "Invalid request format"}), 400

        customer_id = data.get("username")  # We're using username field for CustomerID
        password = data.get("password")

        # Validate inputs
        if not customer_id or not password:
            return jsonify({"error": "Customer ID and password are required"}), 400

        if not customer_id.isdigit():
            return jsonify({"error": "Customer ID must be numeric"}), 400

        customer_user = customer_login_collection.find_one({"CustomerID": int(customer_id)})

        if not customer_user:
            return jsonify({"error": "Invalid credentials"}), 401

        # Check the hashed password
        if password == customer_user["Password"]:
            return jsonify({
                "message": "Login successful",
                "user": {"CustomerID": customer_user["CustomerID"]}
            }), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401

    except Exception as e:
        print(f"Error during login: {e}")
        return jsonify({"error": "An internal server error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True)
