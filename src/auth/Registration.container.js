import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import Registration from './Registration'
import {registerUser} from './actions'
import constants from './constants'
import {REGISTER_USER} from './mutations'

const {registerUser: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)
    validator.passes()
    return validator.errors.all()
}

const mapDispatchToProps = dispatch => ({
    registerUser(user) {
        return dispatch(registerUser(user))
    }
})

const FormedRegistration = reduxForm({
    validate,
    fields: ['password', 'email', 'name'],
    form: 'RegistrationForm'
})(Registration)

const RegistrationWithData = graphql(REGISTER_USER, {
    props: ({ownProps, mutate}) => ({
        async tryRegister(user) {
            const success = await mutate({variables: user})
            if (success) {
                ownProps.registerUser(user)
                ownProps.history.push('/login')
            }
        }
    })
})(FormedRegistration)

export default connect(
    null,
    mapDispatchToProps
)(RegistrationWithData)
