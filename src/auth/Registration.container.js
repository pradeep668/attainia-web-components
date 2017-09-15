import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import Registration from './Registration'
import {handleError, cancel, register} from './actions'
import constants from './constants'
import {REGISTER_USER} from './mutations'

const {userRegistration: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)
    validator.passes()
    return validator.errors.all()
}

const mapDispatchToProps = dispatch => ({
    handleError(error) {
        return dispatch(handleError(error))
    },
    cancel() {
        return dispatch(cancel())
    },
    registerUser(user) {
        return dispatch(register(user))
    }
})

const FormedRegistration = reduxForm({
    validate,
    fields: ['password', 'email', 'name', 'grantType'],
    form: 'RegistrationForm'
})(Registration)

const RegistrationWithData = graphql(REGISTER_USER, {
    props: ({ownProps, mutate}) => ({
        async tryRegister(user) {
            try {
                const {data: {error, registerUser}} = await mutate({variables: user})
                if (error) {
                    throw new Error(error)
                }
                if (registerUser) ownProps.registerUser(user)
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(FormedRegistration)

export default connect(
    null,
    mapDispatchToProps
)(RegistrationWithData)
