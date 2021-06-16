from flask import Flask, request
from flask_cors import CORS
import json
import math

app = Flask(__name__)
CORS(app)

@app.route('/api', methods=['GET'])
def index():
    #file = open('ten.json', 'r')
    
    #data = json.load(file)
    
    #file.close()

    n = 3 * 10 ** 3

    values = {'pos': [], 'size': n}

    r = 20

    for i in range(n):
        t = 0.05 * i
        x = math.sin(t) * r
        y = 20 - t ** 0.7
        z = math.cos(t) * r
        
        r = r / (1 + 1e-5 * i)

        values['pos'].append([10 * x, 10 * y, 10 * z])

    data = json.dumps(values)

    return data