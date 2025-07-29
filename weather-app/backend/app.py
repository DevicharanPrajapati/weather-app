from flask import Flask, request, jsonify, send_from_directory
import requests
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os

app = Flask(__name__, static_folder="../Frontend", static_url_path="")

# Rate limiting: 50 requests per hour
# Rate limiting: 50 requests per hour
limiter = Limiter(key_func=get_remote_address, default_limits=["50 per hour"])
limiter.init_app(app)


import os
API_KEY = "1e05b7c592b849f38d5192823252807"  # Just for testing



# Serve frontend
@app.route("/")
def index():
    return send_from_directory(app.static_folder, "index.html")

# Weather route
@app.route("/weather")
def weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City required"}), 400
    
    url = f"https://api.weatherapi.com/v1/current.json?key={API_KEY}&q={city}&aqi=no"
    response = requests.get(url)
    
    if response.status_code != 200:
        return jsonify({"error": "API error", "details": response.text}), response.status_code
    
    return jsonify(response.json())

if __name__ == "__main__":
    app.run(debug=True)
