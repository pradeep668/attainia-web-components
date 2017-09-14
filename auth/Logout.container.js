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

import { path } from 'ramda';
import { gql, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

__$styleInject(".loginButton {\n  background-color: #E10600;\n  color: white;\n  cursor: pointer;\n  border: none;\n  border-radius: 5px;\n  font-family: Lato, Helvetica, sans-serif;\n  font-size: 15px;\n  font-weight: 700;\n  padding: 18px 0;\n  text-align: center;\n  text-decoration: none}\n", undefined);

var Logout = function Logout(_ref) {
    var tryLogout = _ref.tryLogout;
    return React.createElement(
        'button',
        { onClick: tryLogout, className: 'logoutButton', type: 'button' },
        'Logout'
    );
};

Logout.propTypes = {
    tryLogout: PropTypes.func.isRequired
};

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

var logout = function logout() {
    return { type: types.LOGOUT };
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







































var taggedTemplateLiteral = function (strings, raw) {
  return Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: Object.freeze(raw)
    }
  }));
};











babelHelpers;

var _templateObject = taggedTemplateLiteral(['\n    mutation loginUser($email: String!, $password: String!) {\n        loginUser(email: $email, password: $password) {\n            id\n            email\n            is_active\n            last_login\n            roles\n            token {\n                access_token\n                expires_in\n                token_type\n                scope\n                redirect_uri\n            }\n        }\n    }\n'], ['\n    mutation loginUser($email: String!, $password: String!) {\n        loginUser(email: $email, password: $password) {\n            id\n            email\n            is_active\n            last_login\n            roles\n            token {\n                access_token\n                expires_in\n                token_type\n                scope\n                redirect_uri\n            }\n        }\n    }\n']);
var _templateObject2 = taggedTemplateLiteral(['\n    mutation logoutUser($token: String!) {\n        logoutUser(token: $token)\n    }\n'], ['\n    mutation logoutUser($token: String!) {\n        logoutUser(token: $token)\n    }\n']);
var _templateObject3 = taggedTemplateLiteral(['\n    mutation passwordReset($email: String!) {\n        passwordReset(email: $email)\n    }\n'], ['\n    mutation passwordReset($email: String!) {\n        passwordReset(email: $email)\n    }\n']);
var _templateObject4 = taggedTemplateLiteral(['\n    mutation refreshUser($token: String!) {\n        refreshUser(token: $token) {\n            access_token\n            expires_in\n            token_type\n            scope\n        }\n    }\n'], ['\n    mutation refreshUser($token: String!) {\n        refreshUser(token: $token) {\n            access_token\n            expires_in\n            token_type\n            scope\n        }\n    }\n']);
var _templateObject5 = taggedTemplateLiteral(['\n    mutation registerApp($name: String!, $redirectUri: String!) {\n        registerApp(name: $name, redirectUri: $redirectUri) {\n            name\n            redirect_uri\n            client_id\n            client_secret\n        }\n    }\n'], ['\n    mutation registerApp($name: String!, $redirectUri: String!) {\n        registerApp(name: $name, redirectUri: $redirectUri) {\n            name\n            redirect_uri\n            client_id\n            client_secret\n        }\n    }\n']);
var _templateObject6 = taggedTemplateLiteral(['\n    mutation registerUser($email: String!, $password: String!, $name: String!) {\n        registerUser(email: $email, password: $password, name: $name)\n    }\n'], ['\n    mutation registerUser($email: String!, $password: String!, $name: String!) {\n        registerUser(email: $email, password: $password, name: $name)\n    }\n']);
var _templateObject7 = taggedTemplateLiteral(['\n    mutation registerSuperUser($email: String!, $password: String!) {\n        registerSuperUser(email: $email, password: $password)\n    }\n'], ['\n    mutation registerSuperUser($email: String!, $password: String!) {\n        registerSuperUser(email: $email, password: $password)\n    }\n']);

var LOGIN_USER = gql(_templateObject);
var LOGOUT_USER = gql(_templateObject2);
var PASSWORD_RESET = gql(_templateObject3);
var REFRESH_TOKEN = gql(_templateObject4);
var REGISTER_APP = gql(_templateObject5);
var REGISTER_USER = gql(_templateObject6);
var REGISTER_SUPER_USER = gql(_templateObject7);

var LogoutWithData = graphql(LOGOUT_USER, {
    props: function props(_ref) {
        var mutate = _ref.mutate,
            ownProps = _ref.ownProps;
        return {
            tryLogout: async function tryLogout() {
                var success = await mutate({ variables: { token: ownProps.token } });
                if (success) {
                    ownProps.logoutUser();
                    ownProps.history.push('/login');
                }
            }
        };
    }
})(Logout);

var mapStoreToProps = function mapStoreToProps(store) {
    return {
        token: path(['auth', 'user', 'access_token'], store)
    };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        logoutUser: function logoutUser(token) {
            return dispatch(logout(token));
        }
    };
};

var Logout_container = connect(mapStoreToProps, mapDispatchToProps)(LogoutWithData);

export default Logout_container;
//# sourceMappingURL=Logout.container.js.map
