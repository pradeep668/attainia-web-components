import {path, toPairs, without} from 'ramda'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import Login from './Login'
import {handleError, login, gotoRegistration, gotoPasswordHelp} from './actions'
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
    handleError(error) {
        return dispatch(handleError(error))
    },
    login(user) {
        return dispatch(login(user))
    },
    gotoPasswordHelp(e) {
        e.preventDefault()
        return dispatch(gotoPasswordHelp())
    },
    gotoRegistration(e) {
        e.preventDefault()
        return dispatch(gotoRegistration())
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
                try {
                    const {data: {error, loginUser}} = await mutate({variables: credentials})
                    if (error) {
                        throw new Error(error)
                    }
                    if (loginUser) {
                        ownProps.login(loginUser)

                        const {token} = loginUser
                        if (token.redirect_uris) {
                            const redirect_uri = token.redirect_uris.split(' ')[0]
                            window.location = `${redirect_uri}${
                                redirect_uri.includes('?') ? '&' : '?'
                            }${
                                toPairs(without('redirect_uris', token)).map(([key, val]) => `${key}=${val}`).join('&')
                            }`
                        }
                    }
                } catch (err) {
                    ownProps.handleError(err)
                }
            }
        })
    }
)(FormedLogin)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginWithData)
