import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import Validator from 'validatorjs'

import {passwordHelp} from './actions'
import PasswordHelp from './PasswordHelp'
import constants from './constants'

const {passwordHelp: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)

    validator.passes()

    return validator.errors.all()
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    passwordHelp: values =>
        passwordHelp(dispatch)(
            values,
            () => ownProps.history.push('/login')
        )
})

export default reduxForm({
    validate,
    fields: ['username'],
    form: 'PasswordHelpForm'
})(connect(null, mapDispatchToProps)(PasswordHelp))
