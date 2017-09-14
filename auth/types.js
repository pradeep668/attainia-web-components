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

export default types;
//# sourceMappingURL=types.js.map
