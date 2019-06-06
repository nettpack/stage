"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Stage = require("./Stage");

Object.keys(_Stage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Stage[key];
    }
  });
});

var _BaseComponent = require("./BaseComponent");

Object.keys(_BaseComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseComponent[key];
    }
  });
});