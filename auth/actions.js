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

var cancel = function cancel() {
    return { type: types.CANCEL };
};
var handleError = function handleError(error) {
    return { error: error, type: types.ERROR };
};
var gotoPasswordHelp = function gotoPasswordHelp() {
    return { type: types.GOTO_PASSWORD_HELP };
};
var gotoRegistration = function gotoRegistration() {
    return { type: types.GOTO_REGISTRATION };
};
var gotoAppRegistration = function gotoAppRegistration() {
    return { type: types.GOTO_APP_REGISTRATION };
};
var passwordHelp = function passwordHelp(email) {
    return { email: email, type: types.PASSWORD_HELP };
};
var registerUser = function registerUser(user) {
    return { user: user, type: types.REGISTER_USER };
};
var registerSuperUser = function registerSuperUser(user) {
    return { user: user, type: types.REGISTER_SUPER_USER };
};
var registerApp = function registerApp(app) {
    return { app: app, type: types.REGISTER_APP };
};
var login = function login(user) {
    return { user: user, type: types.LOGIN };
};
var logout = function logout() {
    return { type: types.LOGOUT };
};

export { cancel, handleError, gotoPasswordHelp, gotoRegistration, gotoAppRegistration, passwordHelp, registerUser, registerSuperUser, registerApp, login, logout };
//# sourceMappingURL=actions.js.map
