/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _hyperapp = __webpack_require__(1);

var _ripple = __webpack_require__(2);

var _ripple2 = _interopRequireDefault(_ripple);

var _swipe = __webpack_require__(3);

var _swipe2 = _interopRequireDefault(_swipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Promise = typeof Promise === 'undefined' ? __webpack_require__(4).Promise : Promise;

var state = {
  paper: 0,
  step: 0
};

var actions = {
  next: function next() {
    return function (state) {
      return { step: state.step + 1 };
    };
  },
  prev: function prev() {
    return function (state) {
      return { step: state.step - 1 };
    };
  },
  menu: function menu() {
    return function (state) {
      return { step: 10 };
    };
  },
  open: function open(p) {
    return function (state) {
      return { paper: p, step: 0 };
    };
  },
  close: function close() {
    return function (state) {
      return { paper: 0, step: 10 };
    };
  }
};

function setTimeoutAsync(delay) {
  return new _Promise(function (resolve, reject) {
    setTimeout(resolve, delay);
  });
}

var Slider = function Slider(_ref, children) {
  var paper = _ref.paper,
      state = _ref.state,
      actions = _ref.actions;

  var oncreate = function oncreate(e) {
    (0, _ripple2.default)(e);
  };

  var adjust = function adjust(track, dx) {
    track.style.transform = "translate3d(calc(" + -100 * (paper == state.paper ? state.step : 0) + "vw + (" + dx + "px)), 0, 0)";
  };
  var slidePrev = function slidePrev() {
    return state.step != 0 ? actions.prev() : 0;
  };
  var slideNext = function slideNext() {
    return state.step != children.length - 1 ? actions.next() : 0;
  };
  var listeners = (0, _swipe2.default)(slidePrev, slideNext, adjust);
  return (0, _hyperapp.h)(
    "div",
    { className: "USlider", oncreate: oncreate },
    (0, _hyperapp.h)(
      "div",
      { className: "USliderArrow URipple _left " + (state.step == 0 ? '_disabled' : ''), onclick: actions.prev },
      (0, _hyperapp.h)(
        "i",
        { className: "material-icons" },
        "keyboard_arrow_left"
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "list" },
      (0, _hyperapp.h)(
        "div",
        _extends({ className: "track", style: { transform: "translate3d(" + -100 * (paper == state.paper ? state.step : 0) + "vw, 0, 0)" } }, listeners),
        children.map(function (c) {
          return (0, _hyperapp.h)(
            "div",
            { className: "slide" },
            c
          );
        })
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "USliderArrow URipple _right " + (state.step == children.length - 1 ? '_disabled' : ''), onclick: actions.next },
      (0, _hyperapp.h)(
        "i",
        { className: "material-icons" },
        "keyboard_arrow_right"
      )
    )
  );
};

var Block = function Block(_ref2, children) {
  var no = _ref2.no,
      step = _ref2.step;
  return (0, _hyperapp.h)(
    "div",
    { className: "Block _" + no + " _s" + step },
    (0, _hyperapp.h)(
      "p",
      { className: "text" },
      children
    )
  );
};

var Preface = function Preface(_ref3) {
  var step = _ref3.step,
      actions = _ref3.actions;
  return (0, _hyperapp.h)(
    "div",
    { key: "preface",
      onremove: function onremove(e, done) {
        return setTimeoutAsync(400).then(done);
      },
      oncreate: function oncreate(e) {
        return (0, _ripple2.default)(e);
      } },
    (0, _hyperapp.h)(
      "p",
      { className: "Copy" },
      "Keep it FUN!"
    ),
    (0, _hyperapp.h)(
      Block,
      { no: 1, step: step },
      (0, _hyperapp.h)(
        "span",
        { className: "title" },
        "20\u5E74\u306E\u696D\u754C\u7D4C\u9A13"
      ),
      "1998\u5E74\u304B\u3089\u4E00\u8CAB\u3057\u3066\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u3092\u30E9\u30A4\u30D5\u30EF\u30FC\u30AF\u3068\u3057\u3066\u304D\u305F\u3001\u696D\u754C\u7D4C\u9A1320\u5E74\u306E\u30D9\u30C6\u30E9\u30F3\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u3067\u3059\u3002"
    ),
    (0, _hyperapp.h)(
      Block,
      { no: 3, step: step },
      (0, _hyperapp.h)(
        "span",
        { className: "title" },
        "\u30D5\u30EB\u30B9\u30BF\u30C3\u30AF"
      ),
      "\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u3084\u30B5\u30FC\u30D0\u30FC\u7BA1\u7406\u306F\u3082\u3061\u308D\u3093\u3001\u5916\u6CE8\u7BA1\u7406\u3001\u57F7\u7B46\u3001\u4F01\u753B\u307E\u3067\u3002\u30A6\u30A7\u30D6\u30B7\u30B9\u30C6\u30E0\u3092\u30EF\u30F3\u30B9\u30C8\u30C3\u30D7\u3067\u63D0\u4F9B\u3067\u304D\u307E\u3059\u3002"
    ),
    (0, _hyperapp.h)(
      Block,
      { no: 2, step: step },
      (0, _hyperapp.h)(
        "span",
        { "class": "title" },
        "\u91CD\u8981\u8077\u52D9\u306E\u7D4C\u9A13"
      ),
      "\u5E74\u9593\u6C7A\u6E08\u9AD8\u30A6\u30F3\u5341\u5104\u5186\u30FB100\u4E07\u30E6\u30FC\u30B6\u30FC\u306E\u30B7\u30B9\u30C6\u30E0\u306E\u8CAC\u4EFB\u8005\u30925\u5E74\u7D4C\u9A13\u3002\u5927\u898F\u6A21\u30B7\u30B9\u30C6\u30E0\u306E\u904B\u7528\u30FB\u7BA1\u7406\u306E\u77E5\u8B58\u304C\u3042\u308A\u307E\u3059\u3002"
    ),
    (0, _hyperapp.h)(Block, { no: 4, step: step }),
    (0, _hyperapp.h)(
      "div",
      { className: "Console UShadow2" },
      (0, _hyperapp.h)(
        "a",
        { className: "button _left " + (step == 0 ? '_disabled' : '') + " URipple", id: "prevButton", onclick: actions.prev },
        (0, _hyperapp.h)(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_left"
        )
      ),
      (0, _hyperapp.h)(
        "a",
        { className: "button _center URipple " + (step == 3 ? '_primary' : ''), id: "menuButton", onclick: actions.menu },
        (0, _hyperapp.h)(
          "i",
          { className: "material-icons" },
          "menu"
        )
      ),
      (0, _hyperapp.h)(
        "a",
        { className: "button _right URipple " + (step == 3 ? '_disabled' : step == 0 ? '_primary' : ''), id: "nextButton", onclick: actions.next },
        (0, _hyperapp.h)(
          "i",
          { className: "material-icons" },
          "keyboard_arrow_right"
        )
      )
    )
  );
};

var Paper = function Paper(_ref4, children) {
  var p = _ref4.p,
      title = _ref4.title,
      state = _ref4.state,
      actions = _ref4.actions;

  var oncreate = function oncreate(e) {
    (0, _ripple2.default)(e);
    e.classList.add('_oncreate');
    setTimeout(function () {
      e.classList.remove('_oncreate');
      setTimeout(function () {
        e.style.transitionDelay = "0s";
      }, 500);
    }, 300);
  };
  return (0, _hyperapp.h)(
    "div",
    { key: "p" + p, className: "Paper _" + p + " UShadow1 " + (p == state.paper ? '_expanded' : ''), onclick: function onclick(e) {
        return p != state.paper ? actions.open(p) : 0;
      }, oncreate: oncreate },
    (0, _hyperapp.h)(
      "div",
      { className: "titleBar UShadow1" },
      (0, _hyperapp.h)(
        "h2",
        { className: "title" },
        title
      ),
      (0, _hyperapp.h)(
        "div",
        { className: "close URipple", onclick: function onclick(e) {
            return p == state.paper ? actions.close() : 0;
          } },
        (0, _hyperapp.h)(
          "i",
          { className: "material-icons" },
          "close"
        )
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "content" },
      children
    )
  );
};

var paper1 = function paper1(_ref5) {
  var state = _ref5.state,
      actions = _ref5.actions;
  return (0, _hyperapp.h)(
    Paper,
    { p: 1, title: "\u4E3B\u306A\u958B\u767A\u5B9F\u7E3E", state: state, actions: actions },
    (0, _hyperapp.h)(
      Slider,
      { paper: 1, state: state, actions: actions },
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { className: "Layout" },
          (0, _hyperapp.h)(
            "div",
            { className: "head _1_1_primix" },
            (0, _hyperapp.h)(
              "h3",
              { className: "title" },
              "\u30AA\u30F3\u30E9\u30A4\u30F3\u30D7\u30EA\u30AF\u30E9\u30B5\u30FC\u30D3\u30B9\uFF081999\u5E74\uFF09"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { className: "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u30AB\u30E1\u30E9\u4ED8\u304D\u643A\u5E2F\u96FB\u8A71\u3067\u64AE\u3063\u305F\u5199\u771F\u3092\u30A6\u30A7\u30D6\u4E0A\u3067\u7DE8\u96C6\u3057\u3001\u30B3\u30F3\u30D3\u30CB\u306E\u8907\u5408\u6A5F\u3067\u30B7\u30FC\u30EB\u5370\u5237\u3002\u5F53\u6642\u51FA\u59CB\u3081\u306E\u5199\u30E1\u3084i\u30E2\u30FC\u30C9\u3092\u6D3B\u7528\u3057\u305F\u91CE\u5FC3\u7684\u306A\u30A6\u30A7\u30D6\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u6280\u8853\u7684\u306B\u306F\u30013\u5927\u30AD\u30E3\u30EA\u30A2\u304C\u305D\u308C\u305E\u308C\u72EC\u81EA\u306E\u30A6\u30A7\u30D6\u30DA\u30FC\u30B8\u306E\u5F62\u5F0F\u306B\u306E\u307F\u5BFE\u5FDC\u3057\u3066\u3044\u308B\u306E\u3092\u3001XSLT\u5909\u63DB\u3067\u30EF\u30F3\u30BD\u30FC\u30B9\u3067\u5BFE\u5FDC\u3067\u304D\u308B\u3088\u3046\u306B\u3057\u305F\u70B9\u304C\u7279\u5FB4\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u8AF8\u822C\u306E\u4E8B\u60C5\u3067\u304A\u8535\u5165\u308A\u306B\u306A\u308A\u307E\u3057\u305F\u3002"
            ),
            (0, _hyperapp.h)(
              "dl",
              { className: "Dl" },
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u74B0\u5883"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "Linux\u3001resin\u3001java\u3001InterBase"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u62C5\u5F53"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u4F01\u753B\u3001\u30B7\u30B9\u30C6\u30E0\u8A2D\u8A08\u3001\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u3001\u30B5\u30FC\u30D0\u30FC\u69CB\u7BC9"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u958B\u767A\u671F\u9593"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "1\u30AB\u6708\u7A0B\u5EA6"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u30AD\u30FC\u30EF\u30FC\u30C9"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "java\u30B5\u30FC\u30D6\u30EC\u30C3\u30C8\u3001XML\u3001XSLT\u3001ImageMagick"
              )
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { className: "Layout" },
          (0, _hyperapp.h)(
            "div",
            { className: "head _1_2_freedl" },
            (0, _hyperapp.h)(
              "h3",
              { className: "title" },
              "\u30A2\u30D5\u30A3\u30EA\u30A8\u30A4\u30C8\u30B7\u30B9\u30C6\u30E0\uFF082008\u5E74\uFF09"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { className: "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u30A2\u30D5\u30A3\u30EA\u30A8\u30A4\u30C8\u3067\u30C7\u30B8\u30BF\u30EB\u30B3\u30F3\u30C6\u30F3\u30C4\u306B\u96C6\u5BA2\u3059\u308B\u30B7\u30B9\u30C6\u30E0\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u304C\u904B\u55B6\u4E2D\u306E\u30A2\u30D5\u30A3\u30EA\u30A8\u30A4\u30C8\u30B5\u30FC\u30D3\u30B9\u306E1\u6A5F\u80FD\u3068\u3057\u3066\u958B\u767A\u3057\u307E\u3057\u305F\u304C\u3001\u300C1\u9031\u9593\u3067\u4F5C\u3063\u3066\u304F\u308C\u300D\u3068\u983C\u307E\u308C\u3066\u3001\u305D\u306E9\u65E5\u5F8C\u306B\u30B5\u30FC\u30D3\u30B9\u30A4\u30F3\u3055\u305B\u305F\u3053\u3068\u3067\u3001\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u306E\u5927\u304D\u306A\u4FE1\u983C\u3092\u5F97\u308B\u3053\u3068\u306B\u306A\u308A\u307E\u3057\u305F\u3002"
            ),
            (0, _hyperapp.h)(
              "dl",
              { className: "Dl" },
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u74B0\u5883"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "Linux\u3001apache\u3001php\u3001mysql"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u62C5\u5F53"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u8981\u4EF6\u5B9A\u7FA9\u3001\u30B7\u30B9\u30C6\u30E0\u8A2D\u8A08\u3001\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u3001\u30EA\u30EA\u30FC\u30B9"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u958B\u767A\u671F\u9593"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "9\u65E5"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u30AD\u30FC\u30EF\u30FC\u30C9"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u30B5\u30A4\u30C8\u5185\u901A\u8CA8\u6C7A\u6E08\u3001\u30AF\u30EC\u30B8\u30C3\u30C8\u30AB\u30FC\u30C9\u6C7A\u6E08"
              )
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { className: "Layout _reverse" },
          (0, _hyperapp.h)(
            "div",
            { className: "head _1_3_beacon" },
            (0, _hyperapp.h)(
              "h3",
              { className: "title" },
              "\u30AA\u30F3\u30E9\u30A4\u30F3TCG\uFF082010\u5E74\uFF09"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { className: "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u72EC\u7ACB\u8D77\u696D\u3057\u3066\u81EA\u5206\u3067\u4F5C\u3063\u305F\u30AA\u30F3\u30E9\u30A4\u30F3TCG\uFF08\u30C8\u30EC\u30FC\u30C7\u30A3\u30F3\u30B0\u30AB\u30FC\u30C9\u30B2\u30FC\u30E0\uFF09\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u67D4\u8EDF\u6027\u306E\u9AD8\u3044\u30B2\u30FC\u30E0\u30A8\u30F3\u30B8\u30F3\u3092\u4F5C\u308B\u5FC5\u8981\u304C\u3042\u308A\u307E\u3057\u305F\u304C\u3001\u8A00\u8A9E\u51E6\u7406\u7CFB\u306E\u77E5\u8B58\u3092\u6D3B\u304B\u3057\u3066VM\uFF08\u4EEE\u60F3\u30DE\u30B7\u30F3\uFF09\u306E\u3088\u3046\u306A\u69CB\u6210\u306B\u3059\u308B\u3053\u3068\u3067\u89E3\u6C7A\u3057\u307E\u3057\u305F\u3002",
              (0, _hyperapp.h)("br", null),
              "\u307E\u305F\u3001\u591A\u4EBA\u6570\u306B\u3088\u308B\u30EA\u30A2\u30EB\u30BF\u30A4\u30E0\u30C1\u30E3\u30C3\u30C8\u3092\u5B9F\u73FE\u3059\u308B\u305F\u3081\u306B\u30B5\u30FC\u30D0\u5074\u306E\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u8A00\u8A9E\u306BErlang\u3092\u9078\u629E\u3057\u3001\u5B9F\u969B\u306B1000\u4EBA\u306E\u540C\u6642\u30C1\u30E3\u30C3\u30C8\u3092\u5B9F\u73FE\u3057\u307E\u3057\u305F\u3002"
            ),
            (0, _hyperapp.h)(
              "dl",
              { className: "Dl" },
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u74B0\u5883"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "Linux, yaws, Erlang, postgresql, flex (ActionScript/Flash)"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u62C5\u5F53"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u4F01\u753B\u3001\u30B7\u30B9\u30C6\u30E0\u8A2D\u8A08\u3001\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u3001\u5916\u6CE8\u7BA1\u7406\u3001\u904B\u55B6\u3001\u4FDD\u5B88"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u958B\u767A\u671F\u9593"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "1\u5E74\u534A"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u30AD\u30FC\u30EF\u30FC\u30C9"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u30B2\u30FC\u30E0\u306E\u4F01\u753B\u3001\u30B2\u30FC\u30E0\u30A8\u30F3\u30B8\u30F3\u3001C10K"
              )
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { className: "Layout _reverse" },
          (0, _hyperapp.h)(
            "div",
            { className: "head _1_5_move" },
            (0, _hyperapp.h)(
              "h3",
              { className: "title" },
              "EC\u30B5\u30A4\u30C8\u3092\u542B\u3080\u30B5\u30FC\u30D0\u30FC\u79FB\u8EE2\uFF082012\u5E74\uFF09"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { className: "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u81EA\u793E\u306E\u30B5\u30FC\u30D0\u30FC30\u53F0\u4F59\u308A\u3092\u793E\u5185\u306E\u30C7\u30FC\u30BF\u30BB\u30F3\u30BF\u30FC\u304B\u3089iDC\u306E\u30D9\u30A2\u30E1\u30BF\u30EB\u30AF\u30E9\u30A6\u30C9\uFF08XenServer\uFF09\u306B\u79FB\u8EE2\u3057\u307E\u3057\u305F\u3002",
              (0, _hyperapp.h)("br", null),
              "\u79FB\u8EE2\u306B\u4F34\u3046\u30B5\u30FC\u30D3\u30B9\u505C\u6B62\u6642\u9593\u3092\u6975\u529B\u77ED\u304F\u3059\u308B\u305F\u3081\u3001mysql\u30EC\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3092\u6D3B\u7528\u3057\u305F\u9577\u3044\u624B\u9806\u306B\u3088\u308A\u307B\u307C\u7121\u505C\u6B62\u3067\u30B7\u30B9\u30C6\u30E0\u306E\u79FB\u8EE2\u3092\u5B9F\u73FE\u3057\u307E\u3057\u305F\u3002",
              (0, _hyperapp.h)("br", null),
              "\u79FB\u8EE2\u5148\u306E\u9078\u5B9A\u3084\u30B9\u30BF\u30C3\u30D5\u306E\u4EBA\u9078\u304B\u3089\u5B9F\u969B\u306E\u79FB\u8EE2\u4F5C\u696D\u306B\u81F3\u308B\u307E\u3067\u3001\u5E45\u5E83\u3044\u8077\u52D9\u3092\u3053\u306A\u3057\u307E\u3057\u305F\u3002"
            ),
            (0, _hyperapp.h)(
              "dl",
              { className: "Dl" },
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u74B0\u5883"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "Linux, apache, php, mysql"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u62C5\u5F53"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u8CAC\u4EFB\u8005\u3001\u30B5\u30FC\u30D0\u30FC\u306E\u8ABF\u9054\u3001\u5916\u6CE8\u7BA1\u7406\u3001\u62C5\u5F53"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u958B\u767A\u671F\u9593"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "4\u30AB\u6708"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u30AD\u30FC\u30EF\u30FC\u30C9"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u4EBA\u9078\u3001XenServer\u3001mysql\u30EC\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3"
              )
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { className: "Layout" },
          (0, _hyperapp.h)(
            "div",
            { className: "head _1_4_renewal" },
            (0, _hyperapp.h)(
              "h3",
              { className: "title" },
              "EC\u30B5\u30A4\u30C8\u306E\u30EA\u30CB\u30E5\u30FC\u30A2\u30EB\uFF082016\u5E74\uFF09"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { className: "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u30DE\u30EB\u30C1\u30C6\u30CA\u30F3\u30C8\u578BEC\u30B5\u30A4\u30C8\u306E\u30EA\u30CB\u30E5\u30FC\u30A2\u30EB\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "4\u5E74\u306B\u6E21\u308B\u9577\u5927\u306A\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3067\u3057\u305F\u304C\u3001\u30B7\u30B9\u30C6\u30E0\u8CAC\u4EFB\u8005\u30FB\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u8CAC\u4EFB\u8005\u3068\u3057\u3066\u3001\u8907\u6570\u306E\u81EA\u793E\u30B3\u30F3\u30C6\u30F3\u30C4\uFF08\u30A6\u30A7\u30D6\u30DA\u30FC\u30B8\u3001SNS\u8A18\u4E8B\u3001\u7D19\u306EDM\uFF09\u306E\u5236\u4F5C\u3001\u30A6\u30A7\u30D6\u30C7\u30B6\u30A4\u30F3\u306E\u6539\u4FEE\u3001\u65B0\u6A5F\u80FD\u306E\u958B\u767A\u306A\u3069\u591A\u5C90\u306B\u6E21\u308B\u30B5\u30D6\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u7D71\u62EC\u3057\u307E\u3057\u305F\u3002",
              (0, _hyperapp.h)("br", null),
              "\u30EA\u30CB\u30E5\u30FC\u30A2\u30EB\u5F8C\u306E\u5404\u7A2E\u65BD\u7B56\u306E\u7532\u6590\u3082\u3042\u308A\u3001\u58F2\u4E0A\u304C50%\u307B\u3069\u4F38\u3073\u307E\u3057\u305F\u3002"
            ),
            (0, _hyperapp.h)(
              "dl",
              { className: "Dl" },
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u74B0\u5883"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "Linux, apache, php, mysql"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u62C5\u5F53"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u8CAC\u4EFB\u8005\u3001\u5916\u6CE8\u7BA1\u7406\u3001\u8A2D\u8A08\u3001\u30B3\u30FC\u30C7\u30A3\u30F3\u30B0\u3001\u30EA\u30EA\u30FC\u30B9"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u958B\u767A\u671F\u9593"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "4\u5E74"
              ),
              (0, _hyperapp.h)(
                "dt",
                { className: "title" },
                "\u30AD\u30FC\u30EF\u30FC\u30C9"
              ),
              (0, _hyperapp.h)(
                "dd",
                { className: "desc" },
                "\u30AA\u30A6\u30F3\u30C9\u30E1\u30C7\u30A3\u30A2\u3001\u30C0\u30A4\u30EC\u30AF\u30C8\u30E1\u30FC\u30EB\u3001\u30D5\u30E9\u30C3\u30C8\u30C7\u30B6\u30A4\u30F3\u3001\u5916\u6CE8\u7BA1\u7406"
              )
            )
          )
        )
      )
    )
  );
};

var paper2 = function paper2(_ref6) {
  var state = _ref6.state,
      actions = _ref6.actions;
  return (0, _hyperapp.h)(
    Paper,
    { p: 2, title: "\u7565\u6B74", state: state, actions: actions },
    (0, _hyperapp.h)(
      "div",
      { className: "Grid" },
      (0, _hyperapp.h)(
        "div",
        { className: "image" },
        (0, _hyperapp.h)("img", { src: "image/2_1_to30.jpg", className: "Photo" })
      ),
      (0, _hyperapp.h)(
        "div",
        { className: "text" },
        (0, _hyperapp.h)(
          "p",
          null,
          "1976\u5E74\u751F\u307E\u308C\u3001\u5343\u8449\u80B2\u3061\u3002\u6771\u4EAC\u7406\u79D1\u5927\u5B66\u7406\u5B66\u90E81\u90E8\u6570\u5B66\u79D1\u5352\u3002",
          (0, _hyperapp.h)("br", null),
          "\u5927\u5B66\u751F\u306E\u3068\u304D\u306B\u306A\u3093\u3068\u306A\u304F\u59CB\u3081\u305F\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u306F\u6B63\u306B\u300C\u904B\u547D\u306E\u51FA\u4F1A\u3044\u300D\u3067\u3057\u305F\u3002\u300C\u81EA\u5206\u306F\u3053\u308C\u3092\u3084\u3063\u3066\u751F\u304D\u3066\u3044\u304F\u3093\u3060\u300D\u3068\u611F\u3058\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u5927\u5B66\u5352\u696D\u5F8C\u306F\u30D5\u30EA\u30FC\u30BF\u30FC\u3092\u3057\u306A\u304C\u3089\u30D5\u30EA\u30FC\u30A6\u30A7\u30A2\u3092\u4F5C\u3063\u3066\u3044\u307E\u3057\u305F\u304C\u3001\u53CB\u9054\u306E\u7D39\u4ECB\u3067\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u3068\u3057\u3066\u4F1A\u793E\u306B\u5C31\u8077\u3059\u308B\u3053\u3068\u306B\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u3044\u304F\u3064\u304B\u30A6\u30A7\u30D6\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u3092\u4E16\u306B\u9001\u308A\u51FA\u3057\u305F\u3082\u306E\u306E\u3001\u81EA\u5206\u306E\u72B6\u6CC1\u306B\u6E80\u8DB3\u3067\u304D\u305A\u30012\u5E74\u8DB3\u3089\u305A\u3067\u9000\u8077\u3057\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u300C\u3082\u3063\u3068\u6280\u8853\u529B\u3092\u9AD8\u3081\u306A\u3051\u308C\u3070\u300D\u3068\u3044\u3046\u5371\u6A5F\u611F\u3068\u300C\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u3067\u30AA\u30F3\u30EA\u30FC\u30EF\u30F3\u306A\u5B58\u5728\u306B\u306A\u308A\u305F\u3044\u300D\u3068\u3044\u3046\u6B32\u671B\u304C\u3042\u308A\u307E\u3057\u305F\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u9000\u8077\u3057\u305F\u79C1\u306F\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u3092\u57FA\u790E\u304B\u3089\u5B66\u3073\u59CB\u3081\u307E\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u57FA\u672C\u30C7\u30FC\u30BF\u69CB\u9020\u3084\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0\u304B\u3089\u59CB\u307E\u308A\u3001\u30AA\u30D6\u30B8\u30A7\u30AF\u30C8\u6307\u5411\u3001\u8A08\u7B97\u6A5F\u79D1\u5B66\u3001\u95A2\u6570\u578B\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u2026",
          (0, _hyperapp.h)("br", null),
          "\u305D\u3093\u306A\u4E2D\u3001\u6700\u3082\u8208\u5473\u3092\u3072\u304B\u308C\u305F\u306E\u306F\u8A00\u8A9E\u51E6\u7406\u7CFB\u3067\u3057\u305F\u3002\u300C\u81EA\u5206\u306E\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u8A00\u8A9E\u3092\u4F5C\u3063\u3066\u4E16\u306B\u5E83\u3081\u305F\u3044\u300D\u305D\u3093\u306A\u5922\u3092\u6301\u3064\u3088\u3046\u306B\u306A\u308A\u307E\u3057\u305F\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u305F\u3060\u3001\u73FE\u5B9F\u306F\u975E\u5E38\u3067\u3057\u305F\u3002\u79C1\u306B\u306F\u3001\u4EBA\u306E\u5F79\u306B\u7ACB\u3064\u3088\u3046\u306A\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u8A00\u8A9E\u3092\u4F5C\u308A\u51FA\u305B\u308B\u767A\u60F3\u3084\u77E5\u6075\u306F\u3042\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u300C\u5DF7\u3067\u6D3B\u8E8D\u3057\u3066\u3044\u308B\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u3084\u7814\u7A76\u8005\u3068\u304F\u3089\u3079\u3066\u3001\u81EA\u5206\u306E\u982D\u306F\u52A3\u3063\u3066\u3044\u308B\u2026\u300D\u305D\u308C\u3092\u75DB\u611F\u3057\u305F\u3068\u304D\u3001\u3075\u3068\u6C17\u304C\u3064\u304F\u3068\u3001\u305D\u3053\u306B\u3044\u305F\u306E\u306F\u793E\u4F1A\u7D4C\u9A13\u306E\u5C11\u306A\u304430\u6B73\u306E\u7121\u8077\u3067\u3057\u305F\u3002"
        )
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "Grid _reverse" },
      (0, _hyperapp.h)(
        "div",
        { className: "image" },
        (0, _hyperapp.h)("img", { src: "image/2_2_to35.jpg", className: "Photo" })
      ),
      (0, _hyperapp.h)(
        "div",
        { className: "text" },
        (0, _hyperapp.h)(
          "p",
          null,
          "30\u6B73\u306B\u3057\u3066\u3088\u3046\u3084\u304F\u8EAB\u306E\u7A0B\u3092\u77E5\u3063\u305F\u79C1\u306F\u3001\u5343\u8449\u770C\u5185\u306E\u5730\u65B9\u96F6\u7D30IT\u30D9\u30F3\u30C0\u30FC\u306B\u5C31\u8077\u3057\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u793E\u4F1A\u7D4C\u9A13\u306E\u5C11\u306A\u3055\u306F\u30CF\u30F3\u30C7\u3067\u3057\u305F\u304C\u3001\u9006\u306B\u6280\u8853\u529B\u306F\u4ED6\u306E\u30B9\u30BF\u30C3\u30D5\u3042\u308B\u3044\u306F\u4ED6\u793E\u306E\u30A8\u30F3\u30B8\u30CB\u30A2\u3088\u308A\u79C0\u3067\u3066\u3044\u305F\u3068\u601D\u3044\u307E\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u4ED5\u4E8B\u3092\u3053\u306A\u3057\u3066\u3044\u304F\u3046\u3061\u306B\u3001\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u304B\u3089\u540D\u6307\u3057\u3067\u4ED5\u4E8B\u3082\u5165\u308B\u3088\u3046\u306B\u3082\u306A\u308A\u307E\u3057\u305F\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u3057\u304B\u3057\u3001\u5165\u793E\u304B\u30893\u5E74\u7D4C\u3061\u3001\u79C1\u306B\u65B0\u3057\u3044\u6B32\u671B\u304C\u82BD\u751F\u3048\u59CB\u3081\u307E\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u4ED6\u4EBA\u306E\u305F\u3081\u3067\u306A\u304F\u81EA\u5206\u306E\u305F\u3081\u306B\u3001\u4E3B\u4F53\u6027\u3092\u6700\u5927\u5316\u3067\u304D\u308B\u74B0\u5883\u3067\u30B7\u30B9\u30C6\u30E0\u3092\u958B\u767A\u3057\u4FDD\u5B88\u3057\u305F\u3044\u3068\u601D\u3046\u3088\u3046\u306B\u306A\u3063\u305F\u306E\u3067\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u305D\u308C\u304B\u3089\u534A\u5E74\u5F8C\u3001\u79C1\u306F\u4F1A\u793E\u3092\u8F9E\u3081\u308B\u3053\u3068\u306B\u306A\u308A\u307E\u3059\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u79C1\u306F\u4F1A\u793E\u3092\u8F9E\u3081\u3066\u72EC\u7ACB\u3057\u3001\u30AA\u30F3\u30E9\u30A4\u30F3\u30B2\u30FC\u30E0\u3092\u4F5C\u308A\u59CB\u3081\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "1\u5E74\u304B\u3051\u3066\u4F01\u753B\u30FB\u958B\u767A\u3057\u3001\u79C1\u306E\u6301\u3066\u308B\u30A2\u30A4\u30C7\u30A3\u30A2\u3068\u6280\u8853\u3092\u8A70\u3081\u8FBC\u3093\u3060\u305D\u306E\u30B2\u30FC\u30E0\u306F\u3001\u3084\u306F\u308A\u5931\u6557\u3057\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u30B2\u30FC\u30E0\u3092\u697D\u3057\u3093\u3067\u304F\u308C\u308B\u4EBA\u304C\u3044\u3066\u3001\u307B\u3081\u3066\u304F\u308C\u308B\u4EBA\u3082\u3044\u307E\u3057\u305F\u304C\u3001\u72D9\u3063\u305F\u3068\u3053\u308D\u304C\u30CB\u30C3\u30C1\u904E\u304E\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u305D\u3057\u3066\u3001\u4EBA\u3092\u305F\u304F\u3055\u3093\u96C6\u3081\u308B\u305F\u3081\u306E\u8CC7\u91D1\u3092\u96C6\u3081\u308B\u3053\u3068\u3082\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u3053\u308C\u306F\u3001\u30AA\u30F3\u30E9\u30A4\u30F3\u30B2\u30FC\u30E0\u306E\u4E16\u754C\u3067\u306F\u81F4\u547D\u7684\u306A\u3053\u3068\u3067\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u79C1\u306F\u4E16\u9593\u77E5\u3089\u305A\u3067\u3057\u305F\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u8CC7\u91D1\u304C\u5C3D\u304D\u3066\u3001\u6B21\u306E\u8EAB\u306E\u632F\u308A\u65B9\u3092\u8003\u3048\u3066\u3044\u308B\u3061\u3087\u3046\u3069\u305D\u306E\u6642\u306B\u3001\u4EE5\u524D\u306E\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u304B\u3089\u300C\u3046\u3061\u306B\u6765\u306A\u3044\u304B\u300D\u3068\u8A98\u308F\u308C\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u305D\u308C\u304C\u3001\u3044\u307E\u79C1\u304C\u52E4\u3081\u3066\u3044\u308B\u4F1A\u793E\u3067\u3059\u3002"
        )
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { className: "Grid" },
      (0, _hyperapp.h)(
        "div",
        { className: "image" },
        (0, _hyperapp.h)("img", { src: "image/2_3_tonow.jpg", className: "Photo" })
      ),
      (0, _hyperapp.h)(
        "div",
        { className: "text" },
        (0, _hyperapp.h)(
          "p",
          null,
          "\u4ECA\u306E\u4F1A\u793E\u306F\u30DE\u30EB\u30C1\u30C6\u30CA\u30F3\u30C8\u578B\u306EEC\u30B5\u30A4\u30C8\u3092\u904B\u55B6\u3057\u3066\u3044\u308B\u5C0F\u3055\u306A\u4F1A\u793E\u3067\u3059\u3002\u5C0F\u3055\u3044\u306A\u304C\u3089\u3082\u5E74\u9593\u6C7A\u6E08\u9AD8\u306F\u30A6\u30F3\u5341\u5104\u5186\u306B\u3082\u4E0A\u308A\u307E\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u5165\u793E2\u5E74\u76EE\u304B\u3089\u306F\u30B7\u30B9\u30C6\u30E0\u90E8\u9580\u306E\u8CAC\u4EFB\u8005\u306B\u306A\u308A\u3001\u62C5\u5F53\u3059\u308B\u4ED5\u4E8B\u3082\u624B\u3092\u52D5\u304B\u3059\u4ED5\u4E8B\u304B\u3089\u4EBA\u3092\u52D5\u304B\u3059\u4ED5\u4E8B\u3078\u6BD4\u91CD\u304C\u79FB\u308A\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u5165\u793E\u304B\u30896\u5E74\u4F59\u308A\u7D4C\u3061\u3001\u305D\u306E\u9593\u306B\u3001\u5168\u793E\u7684\u306A\u30B5\u30FC\u30D0\u30FC\u79FB\u8EE2\u30844\u5E74\u304C\u304B\u308A\u306E\u30B5\u30FC\u30D3\u30B9\u306E\u30EA\u30CB\u30E5\u30FC\u30A2\u30EB\u306A\u3069\u3001\u69D8\u3005\u306A\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u3092\u5B8C\u9042\u3057\u3066\u304D\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u30D7\u30E9\u30A4\u30D9\u30FC\u30C8\u3067\u306F\u7D50\u5A5A\u3057\u3066\u5B50\u4F9B\u3082\u6388\u304B\u308A\u307E\u3057\u305F\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "2017\u5E741\u6708\u73FE\u5728\u3001\u79C1\u306F40\u6B73\u3067\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u6614\u306E\u3088\u3046\u306B\u3001\u5FB9\u591C\u3067\u4ED5\u4E8B\u3092\u3057\u305F\u308A\u4F11\u65E5\u8FD4\u4E0A\u3067\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u66F8\u3044\u305F\u308A\u306F\u3067\u304D\u307E\u305B\u3093\u3002",
          (0, _hyperapp.h)("br", null),
          "\u30DE\u30CD\u30FC\u30B8\u30E1\u30F3\u30C8\u306E\u4ED5\u4E8B\u304C\u5897\u3048\u3001\u6700\u65B0\u306E\u6280\u8853\u306B\u89E6\u308C\u308B\u6A5F\u4F1A\u3082\u6E1B\u308A\u307E\u3057\u305F\u3002",
          (0, _hyperapp.h)("br", null),
          "\u305D\u308C\u3067\u3082\u3001\u4ECA\u3067\u3082\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u3078\u306E\u610F\u6B32\u30FB\u559C\u3073\u306F\u307E\u3063\u305F\u304F\u8870\u3048\u3066\u3044\u307E\u305B\u3093\u3002",
          (0, _hyperapp.h)("br", null),
          "\u4ECA\u3067\u3082\u3001\u610F\u6B32\u3092\u6301\u3063\u3066\u3001\u697D\u3057\u3093\u3067\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\uFF0F\u30A8\u30F3\u30B8\u30CB\u30A2\u3068\u3057\u3066\u6D3B\u52D5\u3057\u3066\u3044\u307E\u3059\u3002"
        )
      )
    )
  );
};

var paper3 = function paper3(_ref7) {
  var state = _ref7.state,
      actions = _ref7.actions;
  return (0, _hyperapp.h)(
    Paper,
    { p: 3, title: "\u30B9\u30AD\u30EB\u30FB\u8208\u5473", state: state, actions: actions },
    (0, _hyperapp.h)(
      Slider,
      { paper: 3, state: state, actions: actions },
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { "class": "Layout" },
          (0, _hyperapp.h)(
            "div",
            { "class": "head _3_1_knowledge" },
            (0, _hyperapp.h)(
              "h3",
              { "class": "title" },
              "\u77E5\u8B58"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { "class": "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u6570\u5B66\u5C02\u653B\u3067\u5927\u5B66\u3092\u5352\u696D\u3057\u3066\u3044\u3066\u3001\u30ED\u30B8\u30AB\u30EB\u306A\u601D\u8003\u304C\u8EAB\u306B\u3064\u3044\u3066\u3044\u307E\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u30A2\u30EB\u30B4\u30EA\u30BA\u30E0\u3068\u30C7\u30FC\u30BF\u69CB\u9020\u3092\u5B66\u7FD2\u3057\u3066\u3044\u3066\u3001C\u8A00\u8A9E\u306A\u3069\u4F4E\u30EC\u30D9\u30EB\u306A\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u306E\u969B\u306B\u5B9F\u88C5\u3059\u308B\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002\u3082\u3061\u308D\u3093\u3001\u4F7F\u3046\u30C7\u30FC\u30BF\u69CB\u9020\u3092\u9078\u3076\u969B\u306B\u3082\u9593\u9055\u3046\u3053\u3068\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
              (0, _hyperapp.h)("br", null),
              "\u7279\u306B\u8A00\u8A9E\u51E6\u7406\u7CFB\uFF08\u30B3\u30F3\u30D1\u30A4\u30E9\u3084VM\u306A\u3069\uFF09\u306B\u8208\u5473\u3092\u6301\u3063\u3066\u3044\u305F\u6642\u671F\u304C\u3042\u308A\u3001\u8907\u96D1\u304B\u3064\u67D4\u8EDF\u6027\u306E\u6C42\u3081\u3089\u308C\u308B\u554F\u984C\u306E\u89E3\u6C7A\u306B\u5FDC\u7528\u3067\u304D\u307E\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u95A2\u6570\u578B\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u304C\u6614\u304B\u3089\u597D\u304D\u3067\u3001\u30C6\u30B9\u30BF\u30D6\u30EB\u306A\u30D7\u30ED\u30B0\u30E9\u30E0\u3092\u66F8\u304F\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002"
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { "class": "Layout" },
          (0, _hyperapp.h)(
            "div",
            { "class": "head _3_2_position" },
            (0, _hyperapp.h)(
              "h3",
              { "class": "title" },
              "\u30DD\u30B8\u30B7\u30E7\u30F3"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { "class": "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u57FA\u672C\u7684\u306B\u306F\u30A6\u30A7\u30D6\u7CFB\u306E\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u30A8\u30F3\u30B8\u30CB\u30A2\uFF08\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\uFF09\u3067\u3001\u30D5\u30ED\u30F3\u30C8\u30A8\u30F3\u30C9\u30FB\u30D0\u30C3\u30AF\u30A8\u30F3\u30C9\u306E\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u304C\u672C\u8077\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u3053\u308C\u306B\u4ED8\u5E2F\u3057\u3066\u3001\u30C7\u30FC\u30BF\u30D9\u30FC\u30B9\u306E\u53D6\u308A\u6271\u3044\u3084\u30B5\u30FC\u30D0\u30FC\u69CB\u7BC9\u3082\u884C\u3048\u307E\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u5F53\u7136\u3001\u8981\u4EF6\u5B9A\u7FA9\u3084\u8A2D\u8A08\u3001\u8CC7\u6599\u4F5C\u6210\u306A\u3069\u3082\u3067\u304D\u307E\u3059\u3002"
            ),
            (0, _hyperapp.h)(
              "p",
              null,
              "\u6700\u8FD1\u3067\u306F\u30DE\u30CD\u30FC\u30B8\u30E1\u30F3\u30C8\u7CFB\u306E\u4ED5\u4E8B\u3092\u3084\u308B\u3053\u3068\u304C\u591A\u304F\u3001\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u3084\u30A6\u30A7\u30D6\u30C7\u30B6\u30A4\u30CA\u30FC\u306E\u4EBA\u9078\u3084\u4EA4\u6E09\u3001\u5916\u6CE8\u7BA1\u7406\u306E\u7D4C\u9A13\u3082\u8C4A\u5BCC\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u307E\u305F\u3001\u30D7\u30ED\u306E\u30EC\u30D9\u30EB\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u304C\u3001\u4F01\u753B\u3084\u57F7\u7B46\u3082\u3042\u308B\u7A0B\u5EA6\u306E\u30AF\u30AA\u30EA\u30C6\u30A3\u3067\u4ED5\u4E8B\u304C\u3067\u304D\u307E\u3059\u3002"
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { "class": "Layout _reverse" },
          (0, _hyperapp.h)(
            "div",
            { "class": "head _3_3_skill" },
            (0, _hyperapp.h)(
              "h3",
              { "class": "title" },
              "\u30B9\u30AD\u30EB"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { "class": "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u30B5\u30FC\u30D0\u30FC\u306F\u5C02\u3089Linux\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u8A00\u8A9E\u306F\u3044\u308D\u3044\u308D\u4F7F\u3044\u307E\u3059\u304C\u3001\u30B5\u30FC\u30D0\u30FC\u5074\u306E\u30D5\u30A1\u30FC\u30B9\u30C8\u30C1\u30E7\u30A4\u30B9\u306Fphp\u3067\u3059\u3002java\u3068Erlang\u306F\u7D4C\u9A13\u304C\u3042\u308A\u307E\u3059\u3002Go\u3082\u4F7F\u3044\u305F\u3044\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "php\u30D5\u30EC\u30FC\u30E0\u30EF\u30FC\u30AF\u306F\u3001Laravel\u3001CodeIgniter\u3001FuelPHP\u3092\u305F\u3057\u306A\u307F\u307E\u3059\u3002\u81EA\u5206\u3067\u9078\u3076\u306A\u3089Laravel\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u5074\u306B\u3064\u3044\u3066\u306F\u3001\u57FA\u672C\u30B9\u30AD\u30EB\u306EHTML\u3001CSS\u3001javascript\u306F\u554F\u984C\u3042\u308A\u307E\u305B\u3093\u3002jquery\u306E\u7D4C\u9A13\u304C\u8C4A\u5BCC\u3067\u3059\u3002",
              (0, _hyperapp.h)("br", null),
              "\u6700\u8FD1\u6D41\u884C\u308A\u306EReact/redux\u3084Vue.js\u306A\u3069\u306F\u3001\u30A6\u30A9\u30C3\u30C1\u306F\u3057\u3066\u307E\u3059\u304C\u672C\u683C\u7684\u306B\u4F7F\u3063\u305F\u3053\u3068\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
              (0, _hyperapp.h)("br", null),
              "DevOps\u3001CI\u3068\u3044\u3063\u305F\u6700\u8FD1\u306E\u958B\u767A\u5468\u8FBA\u30C4\u30FC\u30EB\u306F\u30AD\u30E3\u30C3\u30C1\u30A2\u30C3\u30D7\u3067\u304D\u3066\u3044\u307E\u305B\u3093\u3002"
            )
          )
        )
      ),
      (0, _hyperapp.h)(
        "div",
        null,
        (0, _hyperapp.h)(
          "div",
          { "class": "Layout" },
          (0, _hyperapp.h)(
            "div",
            { "class": "head _3_4_outlook" },
            (0, _hyperapp.h)(
              "h3",
              { "class": "title" },
              "\u8208\u5473"
            )
          ),
          (0, _hyperapp.h)(
            "div",
            { "class": "body" },
            (0, _hyperapp.h)(
              "p",
              null,
              "\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u30BD\u30D5\u30C8\u306E\u8A2D\u8A08\u624B\u6CD5\u3068\u3057\u3066DDD\uFF08\u30C9\u30E1\u30A4\u30F3\u99C6\u52D5\u958B\u767A\uFF09\u306B\u5927\u304D\u306A\u95A2\u5FC3\u3092\u5BC4\u305B\u3066\u3044\u307E\u3059\u3002"
            ),
            (0, _hyperapp.h)(
              "p",
              null,
              "\u6700\u8FD1\u306F\u30B5\u30FC\u30D0\u30FC\u306E\u4FDD\u5B88\u304C\u4E0D\u8981\u307E\u305F\u306F\u4F4E\u6E1B\u3055\u308C\u308B\u6280\u8853\u306B\u8208\u5473\u304C\u3042\u3063\u3066\u3001\u30B3\u30F3\u30C6\u30CA\u3001twelve factor app\u3001\u30B9\u30C6\u30FC\u30C8\u30EC\u30B9\u30A2\u30FC\u30AD\u30C6\u30AF\u30C1\u30E3\u3001FaaS\u3068\u3044\u3063\u305F\u30AD\u30FC\u30EF\u30FC\u30C9\u306B\u306F\u654F\u611F\u306B\u53CD\u5FDC\u3059\u308B\u3088\u3046\u306B\u306A\u308A\u307E\u3057\u305F\u3002",
              (0, _hyperapp.h)("br", null),
              "\u4ECA\u5F8C\u306F\u30B5\u30FC\u30D0\u30FC\u4FDD\u5B88\u3068\u3044\u3046\u4ED5\u4E8B\u306F\u7121\u304F\u306A\u3063\u3066\u3044\u304F\u3079\u304D\u3060\u3068\u8003\u3048\u3066\u3044\u307E\u3059\u3002"
            )
          )
        )
      )
    )
  );
};

var paper4 = function paper4(_ref8) {
  var state = _ref8.state,
      actions = _ref8.actions;
  return (0, _hyperapp.h)(
    Paper,
    { p: 4, title: "\u30D7\u30ED\u30D5\u30A3\u30FC\u30EB", state: state, actions: actions },
    (0, _hyperapp.h)(
      "div",
      { "class": "Grid" },
      (0, _hyperapp.h)(
        "div",
        { "class": "image" },
        (0, _hyperapp.h)("img", { src: "image/4_1_msg.jpg", "class": "Photo" })
      ),
      (0, _hyperapp.h)(
        "div",
        { "class": "text" },
        (0, _hyperapp.h)(
          "p",
          null,
          "\u3042\u3089\u3086\u308B\u3082\u306E\u304C\u30BD\u30D5\u30C8\u30A6\u30A7\u30A2\u3068\u5316\u3057\u3066\u3044\u304F\u73FE\u4EE3\u306B\u304A\u3044\u3066\u30A2\u30D7\u30EA\u30B1\u30FC\u30B7\u30E7\u30F3\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u306F\u3001\u5358\u306B\u30B7\u30B9\u30C6\u30E0\u3092\u88FD\u9020\u3059\u308B\u3068\u3044\u3046\u3053\u3068\u3067\u306F\u306A\u304F\u3001\u65B0\u3057\u3044\u4FA1\u5024\u3092\u4E16\u306B\u554F\u3044\u304B\u3051\u3066\u3044\u304F\u3053\u3068\u304C\u3067\u304D\u307E\u3059\u3002",
          (0, _hyperapp.h)("br", null),
          "\u305D\u3093\u306A\u6642\u4EE3\u306B\u305D\u3093\u306A\u8077\u7A2E\u3067\u3044\u305F\u3053\u3068\u306F\u3068\u3066\u3082\u5E78\u904B\u306A\u3053\u3068\u3067\u3001\u3060\u304B\u3089\u3053\u305D\u300C\u305D\u3046\u3042\u308A\u305F\u3044\u300D\u3068\u3044\u3046\u5E0C\u671B\u3092\u6301\u3063\u3066\u3044\u307E\u3059\u3002"
        ),
        (0, _hyperapp.h)(
          "p",
          null,
          "\u610F\u6B32\u3092\u6301\u3063\u3066\u4E3B\u4F53\u7684\u306B\u3001\u30D7\u30ED\u30B0\u30E9\u30DF\u30F3\u30B0\u306B\u643A\u308F\u3063\u3066\u3044\u304D\u305F\u3044\u3067\u3059\u3002"
        )
      )
    ),
    (0, _hyperapp.h)(
      "div",
      { "class": "Grid _reverse" },
      (0, _hyperapp.h)(
        "div",
        { "class": "image" },
        (0, _hyperapp.h)("img", { src: "image/4_2_stats.jpg", "class": "Photo" })
      ),
      (0, _hyperapp.h)(
        "div",
        { "class": "text" },
        (0, _hyperapp.h)("img", { src: "image/icon_L.jpg", "class": "Icon" }),
        (0, _hyperapp.h)(
          "dl",
          { "class": "Profile" },
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u540D\u524D"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u5C71\u7530 \u54F2\u592E",
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
              "span",
              { "class": "Note" },
              "\u3084\u307E\u3060 \u3066\u3064\u304A"
            )
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u5E74\u9F62"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "40\u6B73\uFF082017\u5E741\u6708\u73FE\u5728\uFF09"
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u4F4F\u307E\u3044"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u5343\u8449\u770C\u5343\u8449\u5E02"
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u8077\u696D"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u30B7\u30B9\u30C6\u30E0\u30A8\u30F3\u30B8\u30CB\u30A2\uFF0F\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC",
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
              "span",
              { "class": "Note" },
              "\u30E2\u30FC\u30EB\u30B7\u30B9\u30C6\u30E0\u306E\u904B\u55B6\u4F1A\u793E\u306B\u6B63\u793E\u54E1\u3068\u3057\u3066\u5C31\u696D\u4E2D\u3002"
            )
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u6D3B\u52D5"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "http://qiita.com/tyam001", target: "_blank" },
              "Qiita"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "http://b.hatena.ne.jp/tyam001/", target: "_blank" },
              "\u306F\u3066\u306A\u30D6\u30C3\u30AF\u30DE\u30FC\u30AF"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "https://github.com/tyam", target: "_blank" },
              "GitHub"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "https://twitter.com/tyam001", target: "_blank" },
              "twitter"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "https://www.facebook.com/tetsuo.yamada.146", target: "_blank" },
              "Facebook"
            )
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u5F71\u97FF\u3092\u53D7\u3051\u305F\u672C"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "http://amzn.asia/gRYeQMt", target: "_blank" },
              "\u300E7\u3064\u306E\u7FD2\u6163\u300F\u30B9\u30C6\u30A3\u30FC\u30D6\u30F3\u30FBR. \u30B3\u30F4\u30A3\u30FC\u8457"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "http://amzn.asia/cNfhpt7", target: "_blank" },
              "\u300E\u8A08\u7B97\u6A5F\u30D7\u30ED\u30B0\u30E9\u30E0\u306E\u69CB\u9020\u3068\u89E3\u91C8\u300F\u30CF\u30ED\u30EB\u30C9 \u30A8\u30A4\u30D6\u30EB\u30BD\u30F3\u8457"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            (0, _hyperapp.h)(
              "a",
              { href: "http://amzn.asia/6SPZgLv", target: "_blank" },
              "\u300E\u306F\u3058\u3081\u3066\u306EGTD \u30B9\u30C8\u30EC\u30B9\u30D5\u30EA\u30FC\u306E\u6574\u7406\u8853\u300F\u30C7\u30D3\u30C3\u30C9\u30FB\u30A2\u30EC\u30F3\u8457"
            )
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u5BB6\u65CF"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u65E2\u5A5A\u3002\u5B50\u3069\u3082\u304C\u3044\u307E\u3059\u3002"
          ),
          (0, _hyperapp.h)(
            "dt",
            { "class": "title" },
            "\u8DA3\u5473"
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u81EA\u7136\u6563\u7B56",
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
              "span",
              { "class": "Note" },
              "\u5C3E\u702C\u306A\u3069\u666F\u89B3\u306E\u826F\u3044\u3068\u3053\u308D\u306B\u884C\u304F\u306E\u304C\u597D\u304D\u3067\u3059\u3002"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u30B5\u30C3\u30AB\u30FC",
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
              "span",
              { "class": "Note" },
              "\u89B3\u6226\u3088\u308A\u30D7\u30EC\u30A4\u3059\u308B\u65B9\u304C\u597D\u304D\u3002\u6700\u8FD1\u3084\u3063\u3066\u306A\u3044\u2026"
            )
          ),
          (0, _hyperapp.h)(
            "dd",
            { "class": "desc" },
            "\u56F2\u7881",
            (0, _hyperapp.h)("br", null),
            (0, _hyperapp.h)(
              "span",
              { "class": "Note" },
              "\u4E00\u6642\u671F\u306F\u307E\u308A\u307E\u3057\u305F\u304C\u6700\u8FD1\u306F\u3057\u3066\u306A\u3044\u3067\u3059\u3002\u30CD\u30C3\u30C84\u7D1A"
            )
          )
        )
      )
    )
  );
};

var Menu = function Menu(_ref9) {
  var state = _ref9.state,
      actions = _ref9.actions;

  var appear = function appear(el) {
    return function () {
      el.classList.add('_active');
      setTimeoutAsync(300).then(function () {
        return el.getElementsByClassName('content')[0].classList.add('_appear');
      });
    };
  };
  return (0, _hyperapp.h)(
    "div",
    { key: "menu", className: "MenuBg", oncreate: function oncreate(el) {
        return setTimeoutAsync(10).then(appear(el));
      } },
    (0, _hyperapp.h)(
      "div",
      { className: "content" },
      (0, _hyperapp.h)(
        "div",
        { className: "MyPhoto" },
        (0, _hyperapp.h)("img", { src: "image/yamatez.jpg", className: "" })
      ),
      (0, _hyperapp.h)(
        "h1",
        null,
        "TETSUO YAMADA",
        (0, _hyperapp.h)(
          "small",
          null,
          "\u30D7\u30ED\u30B0\u30E9\u30DE\u30FC\u5C71\u7530\u54F2\u592E\u306E\u81EA\u5DF1\u7D39\u4ECB"
        )
      ),
      paper1({ state: state, actions: actions }),
      paper2({ state: state, actions: actions }),
      paper3({ state: state, actions: actions }),
      paper4({ state: state, actions: actions })
    )
  );
};

var Footer = function Footer() {
  return (0, _hyperapp.h)(
    "div",
    { className: "Footer UShadow3", oncreate: function oncreate(e) {
        return (0, _ripple2.default)(e);
      } },
    (0, _hyperapp.h)(
      "div",
      { className: "Share" },
      (0, _hyperapp.h)(
        "a",
        { href: "https://twitter.com/share?url=https%3A%2F%2Ftyam.github.io%2F&text=%E3%83%97%E3%83%AD%E3%82%B0%E3%83%A9%E3%83%9E%E3%83%BC%E5%B1%B1%E7%94%B0%E5%93%B2%E5%A4%AE%E3%81%AE%E8%87%AA%E5%B7%B1%E7%B4%B9%E4%BB%8B", className: "sharer _twitter URipple", target: "_blank" },
        (0, _hyperapp.h)("span", { className: "icon icon-twitter" }),
        " \u30C4\u30A4\u30FC\u30C8"
      ),
      (0, _hyperapp.h)(
        "a",
        { href: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ftyam.github.io%2F", className: "sharer _facebook URipple", target: "_blank" },
        (0, _hyperapp.h)("span", { className: "icon icon-facebook" }),
        " \u30B7\u30A7\u30A2"
      ),
      (0, _hyperapp.h)(
        "a",
        { href: "http://b.hatena.ne.jp/add?url=https%3A%2F%2Ftyam.github.io%2F", target: "_blank", className: "sharer _hatena URipple" },
        (0, _hyperapp.h)("span", { className: "icon icon-hatena" }),
        " \u306F\u3066\u30D6"
      ),
      (0, _hyperapp.h)(
        "a",
        { href: "http://getpocket.com/edit?url=https%3A%2F%2Ftyam.github.io%2F", className: "sharer _pocket URipple", target: "_blank" },
        (0, _hyperapp.h)("span", { className: "icon icon-pocket" }),
        " \u30DD\u30B1\u30C3\u30C8"
      )
    )
  );
};

var view = function view(state, actions) {
  var preface = state.paper == 0 && state.step != 10 ? (0, _hyperapp.h)(Preface, { step: state.step, actions: actions }) : null;
  var menu = state.paper != 0 || state.step == 10 ? (0, _hyperapp.h)(Menu, { state: state, actions: actions }) : null;
  return (0, _hyperapp.h)(
    "div",
    { className: "Wrap" },
    preface,
    menu,
    (0, _hyperapp.h)(Footer, null)
  );
};

var main = (0, _hyperapp.app)(state, actions, view, document.body);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["h"] = h;
/* harmony export (immutable) */ __webpack_exports__["app"] = app;
function h(name, props) {
  var node
  var rest = []
  var children = []
  var length = arguments.length

  while (length-- > 2) rest.push(arguments[length])

  while (rest.length) {
    if (Array.isArray((node = rest.pop()))) {
      for (length = node.length; length--; ) {
        rest.push(node[length])
      }
    } else if (node != null && node !== true && node !== false) {
      children.push(node)
    }
  }

  return typeof name === "function"
    ? name(props || {}, children)
    : {
        name: name,
        props: props || {},
        children: children
      }
}

function app(state, actions, view, container) {
  var renderLock
  var invokeLaterStack = []
  var rootElement = (container && container.children[0]) || null
  var lastNode = rootElement && toVNode(rootElement, [].map)
  var globalState = copy(state)
  var wiredActions = copy(actions)

  scheduleRender(wireStateToActions([], globalState, wiredActions))

  return wiredActions

  function toVNode(element, map) {
    return {
      name: element.nodeName.toLowerCase(),
      props: {},
      children: map.call(element.childNodes, function(element) {
        return element.nodeType === 3
          ? element.nodeValue
          : toVNode(element, map)
      })
    }
  }

  function render() {
    renderLock = !renderLock

    var next = view(globalState, wiredActions)
    if (container && !renderLock) {
      rootElement = patch(container, rootElement, lastNode, (lastNode = next))
    }

    while ((next = invokeLaterStack.pop())) next()
  }

  function scheduleRender() {
    if (!renderLock) {
      renderLock = !renderLock
      setTimeout(render)
    }
  }

  function copy(target, source) {
    var obj = {}

    for (var i in target) obj[i] = target[i]
    for (var i in source) obj[i] = source[i]

    return obj
  }

  function set(path, value, source) {
    var target = {}
    if (path.length) {
      target[path[0]] =
        path.length > 1 ? set(path.slice(1), value, source[path[0]]) : value
      return copy(source, target)
    }
    return value
  }

  function get(path, source) {
    for (var i = 0; i < path.length; i++) {
      source = source[path[i]]
    }
    return source
  }

  function wireStateToActions(path, state, actions) {
    for (var key in actions) {
      typeof actions[key] === "function"
        ? (function(key, action) {
            actions[key] = function(data) {
              if (typeof (data = action(data)) === "function") {
                data = data(get(path, globalState), actions)
              }

              if (
                data &&
                data !== (state = get(path, globalState)) &&
                !data.then // Promise
              ) {
                scheduleRender(
                  (globalState = set(path, copy(state, data), globalState))
                )
              }

              return data
            }
          })(key, actions[key])
        : wireStateToActions(
            path.concat(key),
            (state[key] = state[key] || {}),
            (actions[key] = copy(actions[key]))
          )
    }
  }

  function getKey(node) {
    return node && node.props ? node.props.key : null
  }

  function setElementProp(element, name, value, isSVG, oldValue) {
    if (name === "key") {
    } else if (name === "style") {
      for (var i in copy(oldValue, value)) {
        element[name][i] = value == null || value[i] == null ? "" : value[i]
      }
    } else {
      if (typeof value === "function" || (name in element && !isSVG)) {
        element[name] = value == null ? "" : value
      } else if (value != null && value !== false) {
        element.setAttribute(name, value)
      }

      if (value == null || value === false) {
        element.removeAttribute(name)
      }
    }
  }

  function createElement(node, isSVG) {
    var element =
      typeof node === "string" || typeof node === "number"
        ? document.createTextNode(node)
        : (isSVG = isSVG || node.name === "svg")
          ? document.createElementNS("http://www.w3.org/2000/svg", node.name)
          : document.createElement(node.name)

    if (node.props) {
      if (node.props.oncreate) {
        invokeLaterStack.push(function() {
          node.props.oncreate(element)
        })
      }

      for (var i = 0; i < node.children.length; i++) {
        element.appendChild(createElement(node.children[i], isSVG))
      }

      for (var name in node.props) {
        setElementProp(element, name, node.props[name], isSVG)
      }
    }

    return element
  }

  function updateElement(element, oldProps, props, isSVG) {
    for (var name in copy(oldProps, props)) {
      if (
        props[name] !==
        (name === "value" || name === "checked"
          ? element[name]
          : oldProps[name])
      ) {
        setElementProp(element, name, props[name], isSVG, oldProps[name])
      }
    }

    if (props.onupdate) {
      invokeLaterStack.push(function() {
        props.onupdate(element, oldProps)
      })
    }
  }

  function removeChildren(element, node, props) {
    if ((props = node.props)) {
      for (var i = 0; i < node.children.length; i++) {
        removeChildren(element.childNodes[i], node.children[i])
      }

      if (props.ondestroy) {
        props.ondestroy(element)
      }
    }
    return element
  }

  function removeElement(parent, element, node, cb) {
    function done() {
      parent.removeChild(removeChildren(element, node))
    }

    if (node.props && (cb = node.props.onremove)) {
      cb(element, done)
    } else {
      done()
    }
  }

  function patch(parent, element, oldNode, node, isSVG, nextSibling) {
    if (node === oldNode) {
    } else if (oldNode == null) {
      element = parent.insertBefore(createElement(node, isSVG), element)
    } else if (node.name && node.name === oldNode.name) {
      updateElement(
        element,
        oldNode.props,
        node.props,
        (isSVG = isSVG || node.name === "svg")
      )

      var oldElements = []
      var oldKeyed = {}
      var newKeyed = {}

      for (var i = 0; i < oldNode.children.length; i++) {
        oldElements[i] = element.childNodes[i]

        var oldChild = oldNode.children[i]
        var oldKey = getKey(oldChild)

        if (null != oldKey) {
          oldKeyed[oldKey] = [oldElements[i], oldChild]
        }
      }

      var i = 0
      var j = 0

      while (j < node.children.length) {
        var oldChild = oldNode.children[i]
        var newChild = node.children[j]

        var oldKey = getKey(oldChild)
        var newKey = getKey(newChild)

        if (newKeyed[oldKey]) {
          i++
          continue
        }

        if (newKey == null) {
          if (oldKey == null) {
            patch(element, oldElements[i], oldChild, newChild, isSVG)
            j++
          }
          i++
        } else {
          var recyledNode = oldKeyed[newKey] || []

          if (oldKey === newKey) {
            patch(element, recyledNode[0], recyledNode[1], newChild, isSVG)
            i++
          } else if (recyledNode[0]) {
            patch(
              element,
              element.insertBefore(recyledNode[0], oldElements[i]),
              recyledNode[1],
              newChild,
              isSVG
            )
          } else {
            patch(element, oldElements[i], null, newChild, isSVG)
          }

          j++
          newKeyed[newKey] = newChild
        }
      }

      while (i < oldNode.children.length) {
        var oldChild = oldNode.children[i]
        if (getKey(oldChild) == null) {
          removeElement(element, oldElements[i], oldChild)
        }
        i++
      }

      for (var i in oldKeyed) {
        if (!newKeyed[oldKeyed[i][1].props.key]) {
          removeElement(element, oldKeyed[i][0], oldKeyed[i][1])
        }
      }
    } else if (node.name === oldNode.name) {
      element.nodeValue = node
    } else {
      element = parent.insertBefore(
        createElement(node, isSVG),
        (nextSibling = element)
      )
      removeElement(parent, nextSibling, oldNode)
    }
    return element
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (el) {
    var es = el.getElementsByClassName("URipple");
    var len = es.length;
    for (var i = 0; i < len; i++) {
        es[i].addEventListener('click', handleClick, false);
    }
};

function getScroll() {
    return {
        left: window.pageXOffset || document.documentElement.scrollLeft,
        top: window.pageYOffset || document.documentElement.scrollTop
    };
}

function offsetOf(e) {
    var sc = getScroll();
    var rect = e.getBoundingClientRect();
    return { left: sc.left + rect.left, top: sc.top + rect.top };
}

function handleClick(ev) {
    if (this.getElementsByClassName('ink').length == 0) {
        var e = document.createElement('div');
        e.classList.add('ink');
        this.appendChild(e);
    }
    var ink = this.getElementsByClassName('ink')[0];
    ink.classList.remove('_animate');

    if (!ink.offsetWidth && !ink.offsetHeight) {
        var d = Math.max(this.offsetWidth, this.offsetHeight);
        ink.style.height = d + 'px';
        ink.style.width = d + 'px';
    }

    var offset = offsetOf(this);
    var x = ev.pageX - offset.left - ink.offsetWidth / 2;
    var y = ev.pageY - offset.top - ink.offsetHeight / 2;
    ink.style.top = y + 'px';
    ink.style.left = x + 'px';
    ink.classList.add('_animate');

    if (this.hasAttribute('href')) {
        var dest = this.getAttribute('href');
        setTimeout(function () {
            if (this.getAttribute('target') == '_blank') {
                window.open(dest, '_blank');
            } else {
                location.href = dest;
            }
        }, 200);
        return false;
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (slidePrev, slideNext, adjust) {
    var ox, x;
    var at = null;

    function getX(ev) {
        return ev.pageX || ev.touches[0].pageX;
    }

    function isPaperExpanded(el) {
        for (var e = el; e != null; e = e.parentElement) {
            if (e.classList.contains('Paper')) {
                return e.classList.contains('_expanded');
            }
        }
        console.log('never');
        return false;
    }

    function touchstart(ev) {
        if (!isPaperExpanded(this)) return;
        ev.preventDefault();
        ox = getX(ev);
        x = ox;
        at = new Date().getTime();
        //console.log("start", x);
    }
    function touchmove(ev) {
        if (!isPaperExpanded(this)) return;
        if (!at) return;
        ev.preventDefault();
        x = getX(ev);
        adjust(this, x - ox);
        //console.log("move", x);
    }
    function touchend(ev) {
        if (!isPaperExpanded(this)) return;
        if (!at) return;
        var dx = x - ox;
        var now = new Date().getTime();
        //console.log("end");
        if (now - at >= 120 && document.body.clientWidth <= Math.abs(dx) * 4) {
            //console.log(`swipe ${(dx < 0) ? 'next' : 'prev'}`);
            at = null;
            adjust(this, 0);
            dx < 0 ? slideNext(this) : slidePrev(this);
        } else {
            at = null;
            adjust(this, 0);
        }
    }

    return { ontouchstart: touchstart,
        onmousedown: touchstart,
        ontouchmove: touchmove,
        onmousemove: touchmove,
        ontouchend: touchend,
        onmouseup: touchend };
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.4+314e4831
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ES6Promise = factory());
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

var TRY_CATCH_ERROR = { error: null };

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function getThen(promise) {
  try {
    return promise.then;
  } catch (error) {
    TRY_CATCH_ERROR.error = error;
    return TRY_CATCH_ERROR;
  }
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === TRY_CATCH_ERROR) {
      reject(promise, TRY_CATCH_ERROR.error);
      TRY_CATCH_ERROR.error = null;
    } else if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    handleMaybeThenable(promise, value, getThen(value));
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function tryCatch(callback, detail) {
  try {
    return callback(detail);
  } catch (e) {
    TRY_CATCH_ERROR.error = e;
    return TRY_CATCH_ERROR;
  }
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = void 0,
      failed = void 0;

  if (hasCallback) {
    value = tryCatch(callback, detail);

    if (value === TRY_CATCH_ERROR) {
      failed = true;
      error = value.error;
      value.error = null;
    } else {
      succeeded = true;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
    succeeded = true;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (failed) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = getThen(entry);

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        handleMaybeThenable(promise, entry, _then);
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    return promise.then(function (value) {
      return constructor.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return constructor.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), __webpack_require__(6)))

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 6 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ })
/******/ ]);