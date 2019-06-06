"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stage = void 0;

var _BaseComponent = require("./BaseComponent");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stage =
/*#__PURE__*/
function () {
  function Stage() {
    _classCallCheck(this, Stage);

    this.components = {};
  }
  /**
   * @param {string} name
   * @param {BaseComponent} object
   * @return {BaseComponent}
   */


  _createClass(Stage, [{
    key: "addComponent",
    value: function addComponent(name, object) {
      var newObject = new object(this);

      if (!newObject instanceof _BaseComponent.BaseComponent) {
        throw "Component is not instance of Stage BaseComponent!";
      }

      this.components[name] = newObject;
      return this.components[name];
    }
    /**
     * @return {{}}
     */

  }, {
    key: "getComponents",
    value: function getComponents() {
      return this.components;
    }
    /**
     * @param {string} componentName
     * @return {*}
     */

  }, {
    key: "getComponentByName",
    value: function getComponentByName(componentName) {
      return this.components[componentName];
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "build",
    value: function build() {
      for (var component in this.components) {
        this.components[component].onBuild();
      }

      return true;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "run",
    value: function run() {
      for (var component in this.components) {
        this.components[component].onStartup();
      }

      return true;
    }
  }]);

  return Stage;
}();

exports.Stage = Stage;