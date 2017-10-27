import {path, toPairs, without} from 'ramda'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import Login from './Login'
import {handleError, login, toggleRememberMe, finishedLoading, startedLoading} from './actions'
import constants from './constants'
import {LOGIN_USER} from './mutations'

const {login: {rules, messages}} = constants

const validate = values => {
    const validator = new Validator(values, rules, messages)
    validator.passes()
    return validator.errors.all()
}

const mapStateToProps = state => ({
    hasAuthError: Boolean(state.auth.error),
    email: path(['auth', 'user', 'email'], state),
    name: path(['auth', 'user', 'name'], state),
    loading: state.auth.loading,
    rememberMe: state.auth.rememberMe
})

const FormedLogin = reduxForm({
    validate,
    form: 'LoginForm',
    fields: ['email', 'password']
})(Login)

const LoginWithData = graphql(LOGIN_USER, {
    props: ({ownProps, mutate}) => ({
        async tryLogin({email, password}) {
            try {
                ownProps.startedLoading()

                const {data: {error, loginUser}} = await mutate({variables: {email, password}})
                if (error) {
                    throw new Error(error)
                }
                if (loginUser) {
                    if (ownProps.onLogin) {
                        const deferred = ownProps.onLogin(loginUser)
                        if (deferred && deferred.then) {
                            await deferred
                        }
                    }

                    const {token} = loginUser
                    if (ownProps.useRefresh && token) {
                        const refreshInMs = Math.max((Number(token.expires_in) - 10) * 1000, 0)
                        ownProps.login({
                            ...loginUser,
                            token: {
                                ...token,
                                refreshInMs,
                                refreshAt: new Date(Date.now() + refreshInMs)
                            }
                        })
                    } else {
                        ownProps.login(loginUser)
                    }

                    if (token.redirect_uris) {
                        const redirect_uri = token.redirect_uris.split(' ')[0]
                        window.location = `${redirect_uri}${redirect_uri.includes('?') ? '&' : '?'}${
                            toPairs(without('redirect_uris', token)).map(([key, val]) => `${key}=${val}`).join('&')
                        }`
                    }
                    ownProps.finishedLoading()
                }
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(FormedLogin)

export default connect(mapStateToProps, {
    handleError,
    login,
    startedLoading,
    finishedLoading,
    toggleRememberMe
})(LoginWithData)
