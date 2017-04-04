from flask import Flask, request
import requests as req
import json


app = Flask(__name__)

@app.route('/proxy/all/<string:host>/<path:uri>')
def getFucks(host, uri):
    print('https://{}/{}' .format(host, uri))
    from_api = req.get('https://{}/{}' .format(host, uri))
    res = Response(from_api.text)
    res.headers['Content-type'] = 'application/json'
    return res

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8008)
