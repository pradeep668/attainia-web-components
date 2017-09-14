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

export default Logout;
//# sourceMappingURL=Logout.js.map
