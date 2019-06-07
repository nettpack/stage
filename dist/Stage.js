"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stage = void 0;

var _BasePageComponent = require("./BasePageComponent");

var _BaseGlobalComponent = require("./BaseGlobalComponent");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Stage =
/*#__PURE__*/
function () {
  /**
   * @param {{}} Config
   */
  function Stage(Config) {
    _classCallCheck(this, Stage);

    this.globalComponents = {};
    this.pageComponents = {};
    this.config = Object.assign({
      module: undefined,
      control: undefined,
      action: undefined
    }, Config);
  }
  /**
   * @param {string} name
   * @param {BaseGlobalComponent} object
   * @return {BaseGlobalComponent}
   */


  _createClass(Stage, [{
    key: "addGlobalComponent",
    value: function addGlobalComponent(name, object) {
      var newObject = new object(this);

      if (!newObject instanceof _BaseGlobalComponent.BaseGlobalComponent) {
        throw "Component is not instance of Stage BaseComponent!";
      }

      this.globalComponents[name] = newObject;
      return this.globalComponents[name];
    }
    /**
     * @return {{}}
     */

  }, {
    key: "getGlobalComponents",
    value: function getGlobalComponents() {
      return this.globalComponents;
    }
    /**
     * @param {string} componentName
     * @return {BaseGlobalComponent}
     */

  }, {
    key: "getGlobalComponentByName",
    value: function getGlobalComponentByName(componentName) {
      return this.globalComponents[componentName];
    }
    /**
     * @param {string} name
     * @param {BasePageComponent} object
     * @param {string} module
     * @param {string} control
     * @param {string} action
     * @return {BasePageComponent}
     */

  }, {
    key: "addPageComponent",
    value: function addPageComponent(name, object, module, control, action) {
      var newObject = new object(this, module, control, action);

      if (!newObject instanceof _BasePageComponent.BasePageComponent) {
        throw "Component is not instance of Stage BasePageComponent!";
      }

      this.pageComponents[name] = newObject;
      return this.pageComponents[name];
    }
    /**
     * @return {{}}
     */

  }, {
    key: "getPageComponents",
    value: function getPageComponents() {
      return this.pageComponents;
    }
    /**
     * @param {string} componentName
     * @return {BasePageComponent}
     */

  }, {
    key: "getPageComponentByName",
    value: function getPageComponentByName(componentName) {
      return this.pageComponents[componentName];
    }
  }, {
    key: "getPageComponentsByAction",
    value: function getPageComponentsByAction(module, control, action) {
      var currentPageComponents = [];

      for (var i in this.pageComponents) {
        var component = this.pageComponents[i];

        if (component.module === module && component.control === control && component.action === action) {
          currentPageComponents.push({
            'name': i,
            'component': component
          });
        }
      }

      return currentPageComponents;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "build",
    value: function build() {
      for (var component in this.globalComponents) {
        this.globalComponents[component].onBuild();
      }

      return true;
    }
    /**
     * @return {boolean}
     */

  }, {
    key: "run",
    value: function run() {
      for (var component in this.globalComponents) {
        this.globalComponents[component].onStartup();
      }

      var listCurrentPageComponents = this.getPageComponentsByAction(this.config.module, this.config.control, this.config.action);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = listCurrentPageComponents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var currentPageComponent = _step.value;
          currentPageComponent['component'].run();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return true;
    }
  }]);

  return Stage;
}();

exports.Stage = Stage;