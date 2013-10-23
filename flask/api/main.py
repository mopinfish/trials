#!/usr/bin/env python
# coding:utf-8

import sys, os
from flask import Flask, render_template, jsonify
from datetime import datetime

app = Flask(__name__)
app.debug = True

@app.route('/data/borough/<addr11>.geojson')
def data_borough(addr11):
  #ファイルの存在を確認
  flg = os.path.exists("static/data/tokyo.geojson")
  print flg #True
  print os.path
  
  return addr11

@app.route('/tester')
def tester():
  p = {}
  return render_template('tester.html', p = p)

@app.route('/moge')
def moge():
  return 'moge'

### API ###
@app.route('/api/get/time')
def api_index():
  hash = {'now':str(datetime.now())}
  return jsonify(hash)

#app.run(host='0.0.0.0', port=3001)
