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

var types = {
    CANCEL: 'awc_cancel',
    ERROR: 'awc_error',
    CLEAR_LOGIN: 'awc_clear_login',
    GOTO_PASSWORD_HELP: 'awc_goto_password_help',
    GOTO_REGISTRATION: 'awc_goto_registration',
    GOTO_APP_REGISTRATION: 'awc_goto_app_registration',
    PASSWORD_HELP: 'awc_password_help',
    REGISTER_SUPER_USER: 'awc_register_super_user',
    REGISTER_USER: 'awc_register_user',
    REGISTER_APP: 'awc_register_app',
    LOGIN: 'awc_login',
    LOGOUT: 'awc_logout'
};

var initialState = {
    route: 'login',
    user: {},
    app: {}
};

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

var reducer = (function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        app = _ref.app,
        email = _ref.email,
        user = _ref.user,
        error = _ref.error;

    switch (type) {
        case types.CANCEL:
            {
                return _extends({}, state, {
                    route: 'login'
                });
            }
        case types.ERROR:
            {
                return _extends({}, state, {
                    error: error
                });
            }
        case types.GOTO_REGISTRATION:
            {
                return _extends({}, state, {
                    route: 'registration'
                });
            }
        case types.GOTO_APP_REGISTRATION:
            {
                return _extends({}, state, {
                    route: 'application'
                });
            }
        case types.GOTO_PASSWORD_HELP:
            {
                return _extends({}, state, {
                    route: 'password-help'
                });
            }
        case types.REGISTER_SUPER_USER:
        case types.REGISTER_USER:
            {
                return _extends({}, state, {
                    route: 'login',
                    user: {
                        name: user.name,
                        email: user.email
                    }
                });
            }
        case types.PASSWORD_HELP:
            {
                return _extends({}, state, {
                    route: 'login',
                    user: { email: email }
                });
            }
        case types.REGISTER_APP:
            {
                return _extends({}, state, { app: app, route: 'login' });
            }
        case types.LOGIN:
            {
                return _extends({}, state, { user: user, route: 'home' });
            }
        case types.CLEAR_LOGIN:
        case types.LOGOUT:
            {
                return _extends({}, initialState);
            }
        // no default
    }

    return state;
});

export default reducer;
//# sourceMappingURL=reducer.js.map
