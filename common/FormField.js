function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

import { complement, isNil, pickBy } from 'ramda';
import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = commonjsGlobal.crypto || commonjsGlobal.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

var rngBrowser = rng;

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

var bytesToUuid_1 = bytesToUuid;

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rngBrowser)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid_1(rnds);
}

var v4_1$1 = v4;

__$styleInject(".formGroup .formField  {\n    -webkit-box-sizing: border-box;\n            box-sizing: border-box;\n    padding: 5px;\n    line-height: 16px;    \n}\n\n.formGroup input[type=password],\n    .formGroup input[type=url],\n    .formGroup input[type=number],\n    .formGroup input[type=text],\n    .formGroup input[type=email] {\n    padding: 8px;\n    width: 100%;\n    line-height: 18px;\n    font-size: 14px;\n    background-color: white;    \n}\n\n.formGroup input[type=password]:focus,\n    .formGroup input[type=url]:focus,\n    .formGroup input[type=number]:focus,\n    .formGroup input[type=text]:focus,\n    .formGroup input[type=email]:focus {\n    outline: none;    \n}\n\n.formGroup .fieldError {\n    color: white;\n    background-color: #E10600;\n    font-size: 10px;\n    padding: 7px;\n    text-align: center;    \n}\n\n.squareCheckbox {\n    width: 16px;\n    position: relative    \n}\n\n.squareCheckbox label {\n    width: 16px;\n    height: 16px;\n    position: absolute;\n    cursor: pointer;\n    white-space: nowrap;\n    top: 0;\n    left: 0;\n    background: white;    \n}\n\n.squareCheckbox label span {\n    padding-left: 22px;    \n}\n\n.squareCheckbox label:after {\n    content: '';\n    width: 6px;\n    height: 3px;\n    position: absolute;\n    top: 4px;\n    left: 4px;\n    border: 3px solid #E10600;\n    border-top: none;\n    border-right: none;\n    background: transparent;\n    opacity: 0;\n    -webkit-transform: rotate(-45deg);\n            transform: rotate(-45deg);    \n}\n\n.squareCheckbox label:hover::after {\n    opacity: 0.4;    \n}\n\n.squareCheckbox input[type=checkbox] {\n    visibility: hidden;    \n}\n\n.squareCheckbox input[type=checkbox]:checked + label:after {\n    opacity: 1;    \n}\n", undefined);

var babelHelpers = {};




var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};





































babelHelpers;

/* Not sure when eslint-plugin-react will fix their issue https://github.com/yannickcr/eslint/eslint-plugin-react/issues/1187 */
/* eslint "react/jsx-indent-props": "off" */

var isCheck = function isCheck(type) {
    return (/checkbox/i.test(type)
    );
};
var isNotNil = complement(isNil);

var InputField = function InputField(props) {
    return (/textarea/i.test(props.type) ? React.createElement('textarea', _extends({ className: 'formField' }, props)) : React.createElement('input', _extends({ checked: true, className: 'formField' }, props))
    );
};

InputField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf(['checkbox', 'color', 'date', 'email', 'month', 'number', 'password', 'radio', 'reset', 'search', 'submit', 'tel', 'text', 'textarea', 'url', 'week'])
};

InputField.defaultProps = {
    type: 'text'
};

var FormField = function FormField(_ref) {
    var handlers = _ref.handlers,
        input = _ref.input,
        id = _ref.id,
        _ref$meta = _ref.meta,
        touched = _ref$meta.touched,
        error = _ref$meta.error,
        label = _ref.label,
        name = _ref.name,
        placeholder = _ref.placeholder,
        type = _ref.type,
        value = _ref.value,
        className = _ref.className;
    return React.createElement(
        'div',
        { className: 'formGroup ' + className + (isCheck(type) ? ' squareCheckbox' : '') },
        label && !isCheck(type) ? React.createElement(
            'label',
            { htmlFor: id },
            label
        ) : null,
        React.createElement(InputField, pickBy(isNotNil, _extends({ id: id, value: value, type: type, placeholder: placeholder, name: name }, input, handlers))),
        label && isCheck(type) ? React.createElement(
            'label',
            { htmlFor: id },
            React.createElement(
                'span',
                null,
                label
            )
        ) : null,
        touched && error ? React.createElement(
            'div',
            { className: '' + (touched && error ? 'fieldError' : '') },
            error
        ) : null
    );
};

FormField.propTypes = {
    handlers: PropTypes.shape({
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onDragStart: PropTypes.func,
        onDrop: PropTypes.func,
        onFocus: PropTypes.func,
        onUpdate: PropTypes.func
    }),
    meta: PropTypes.shape({
        active: PropTypes.bool,
        checked: PropTypes.bool,
        dirty: PropTypes.bool,
        error: PropTypes.arrayOf(PropTypes.string),
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
        valid: PropTypes.bool,
        visited: PropTypes.bool
    }),
    className: PropTypes.string,
    input: PropTypes.element,
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
};

FormField.defaultProps = {
    meta: {},
    handlers: {}
};

var ReduxFormField = function ReduxFormField(props) {
    return React.createElement(Field, _extends({
        name: props.name,
        component: FormField
    }, props));
};

ReduxFormField.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string
};

ReduxFormField.defaultProps = {
    id: v4_1$1()
};

export { InputField, FormField };
export default ReduxFormField;
//# sourceMappingURL=FormField.js.map
