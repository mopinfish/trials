"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _express = require("express");

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var router = undefined;
exports["default"] = router = (0, _express.Router)();

router.get('/', function (req, res, next) {
  res.render("index", { title: 'Express' });
});
module.exports = exports["default"];