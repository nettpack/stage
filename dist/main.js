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

var _BasePageComponent = require("./BasePageComponent");

Object.keys(_BasePageComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BasePageComponent[key];
    }
  });
});

var _BaseGlobalComponent = require("./BaseGlobalComponent");

Object.keys(_BaseGlobalComponent).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _BaseGlobalComponent[key];
    }
  });
});