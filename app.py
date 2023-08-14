import joblib

from flask import Flask, request, jsonify
app = Flask(__name__)
msg=""
data = []
neww_data=[[]]
from flask_cors import CORS
CORS(app)

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route('/store', methods=['POST'])
def store_data():
    global data
    global msg
    new_data = request.get_json()
    data.append(new_data)
    
    print("Loading model...")
    loaded_model=joblib.load('model.joblib')
    predictions=loaded_model.predict(data)
    for i,prediction in enumerate(predictions):
        if prediction==1:
            msg="HAS DIABETES"
        else:
            msg="NO DIABETES FOUND"
    return jsonify({"message": "Data stored successfully"}), 200

@app.get('/display')
def display():
    global msg
    return jsonify({"message":msg})


if __name__ == '__main__':
    app.run(debug=True)