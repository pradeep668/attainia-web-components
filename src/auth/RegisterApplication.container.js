import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import Validator from 'validatorjs'

import {registerApplication} from './actions'
import RegisterApplication from './RegisterApplication'
import constants from './constants'

const {registerApplication: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)

    validator.passes()

    return validator.errors.all()
}

const mapStateProps = state => ({
    token: state.auth.user.token
})

const mapDispatchToProps = dispatch => ({
    registerTheApplication: registerApplication(dispatch)
})

const mapMergeProps = (storeProps, dispatchProps, ownProps) => ({
    registerApplication: values => dispatchProps.registerTheApplication(
        {...values, token: storeProps.token},
        () => ownProps.history.push('/home')
    )
})

export default reduxForm({
    validate,
    fields: ['name', 'redirect'],
    form: 'ApplicationRegistrationForm'
})(connect(mapStateProps, mapDispatchToProps, mapMergeProps)(RegisterApplication))
