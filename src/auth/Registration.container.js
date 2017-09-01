import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import Validator from 'validatorjs'

import {register} from './actions'
import Registration from './Registration'
import constants from './constants'

const {register: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)

    validator.passes()

    return validator.errors.all()
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    register: values =>
        register(dispatch)(
            values,
            () => ownProps.history.push('/login')
        )
})

export default reduxForm({
    validate,
    fields: ['username', 'password', 'email', 'name'],
    form: 'RegistrationForm'
})(connect(null, mapDispatchToProps)(Registration))
