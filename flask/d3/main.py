#!/usr/bin/env python
# coding:utf-8

from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)
app.debug = True

@app.route('/school/')
def school():
  return render_template('school.html')


@app.route('/')
def index():
  p = {}
  return render_template('index.html', p = p)

@app.route('/tester')
def tester():
  p = {}
  return render_template('tester.html', p = p)

### API ###
@app.route('/api/get/time')
def api_index():
  hash = {'now':str(datetime.now())}
  return jsonify(hash)

#app.run(host='0.0.0.0', port=3001)
