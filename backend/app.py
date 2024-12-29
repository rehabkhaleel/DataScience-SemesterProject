from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS for the entire app
CORS(app)

@app.route('/')
def hello_world():
    return "Welcome to the Customer Login API!"

@app.route('/api/data', methods=['GET'])
def get_data():
    data = {
        'name': 'Flask App',
        'version': '1.0'
    }
    return jsonify(data)

@app.route('/api/data', methods=['POST'])
def post_data():
    data = request.get_json()
    return jsonify({'received': data}), 201

if __name__ == '__main__':
    app.run(debug=True)
