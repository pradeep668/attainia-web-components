import {path} from 'ramda'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import Login from './Login'
import {login} from './actions'
import constants from './constants'
import {LOGIN_USER} from './mutations'

const {login: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)
    validator.passes()
    return validator.errors.all()
}

const mapStateToProps = state => ({
    email: path(['auth', 'user', 'email'], state),
    name: path(['auth', 'user', 'name'], state)
})

const mapDispatchToProps = dispatch => ({
    login(user) {
        return dispatch(login(user))
    }
})

const FormedLogin = reduxForm({
    validate,
    form: 'LoginForm',
    fields: ['email', 'password']
})(Login)

const LoginWithData = graphql(
    LOGIN_USER, {
    props: ({ownProps, mutate}) => ({
        async tryLogin(credentials) {
            const user = await mutate({variables: credentials})
            return ownProps.login(user)
        }
    })
})(FormedLogin)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginWithData)
