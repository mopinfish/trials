// モジュールの読み込み
var assert = require('assert');
var sample = require('./sample');

// モジュールの確認
console.log('Checking module');
assert.ok(sample);

// add()メソッドテスト
console.log('Testing add() method');
assert.equal(sample.add(1, 1), 2);
assert.notEqual(sample.add(1, 1), 1);
assert.equal(sample.add('1', 1), 2);

