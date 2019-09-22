import json
import os
import base64
from flask import Flask, request
from watson_developer_cloud import VisualRecognitionV3

app = Flask(__name__)

@app.route('/')
def index():
    return "hello world"

@app.route('/getInjuryType', methods=['POST'])
def getInjuryFromML():

    data = request.json

    visual_recognition = VisualRecognitionV3(
        version='2018-03-19',
        iam_apikey=data['iam_apikey'],
    )

    # Save b64 image
    with open('./uploaded_file.png', 'wb') as f:
        f.write(base64.b64decode(data['img']))

    # Query IBM
    with open('./uploaded_file.png', 'rb') as images_file:
        classes = visual_recognition.classify(
            images_file,
            threshold='0.',
            classifier_ids='InjuryClassifier_1389110742',
        ).get_result()
        
    os.system('rm uploaded_file.png')
    return json.dumps(classes, indent=2)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)

