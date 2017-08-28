import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Validator from 'validatorjs';

import {login} from './actions';
import Login from './Login';
import constants from './constants';

const {login: {rules, messages}} = constants;

const validate = (values) => {
    const validator = new Validator(values, rules, messages);

    validator.passes();

    return validator.errors.all();
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    login: values =>
        login(dispatch)(
            values,
            () => ownProps.history.push('/home')
        )
});

export default reduxForm({
    validate,
    fields: ['email', 'password'],
    form: 'LoginForm'
})(connect(null, mapDispatchToProps)(Login));
