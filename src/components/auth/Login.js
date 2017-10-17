import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AuthError from './AuthError.container'
import SpinningButton from '../common/SpinningButton'
import Form from '../common/Form'
import Link from '../common/Link'
import Logo from '../common/Logo'
import ReduxFormField from '../common/ReduxFormField'
import FormField from '../common/FormField'
import {forms} from '../common/constants'

const FullPageWrapper = styled.div`
    min-height: 100vh;
    display: grid;
    align-items: center;
`
const StyledForm = styled(Form)`
    & > * {
        margin: ${forms.formItemMargin};
    }

    & .loginHeader > * {
        margin: 30px auto 15px auto;
    }

    & .passwordHelp {
        text-align: right;
    }

    & .register,
    & .loginButton {
        text-align: center;
    }

    @supports not (display: grid) {
        .loginHeader,
        .email,
        .password,
        .register,
        .rememberMe,
        .passwordHelp,
        .loginButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-areas: 'header header' 'email email' 'password password' 'remember-me password-help'
            'login-button login-button' ${props => props.showRegistration && '"register register"'};

        & .loginHeader {
            grid-area: header;
        }

        & .email {
            grid-area: email;
        }

        & .password {
            grid-area: password;
        }

        & .rememberMe {
            grid-area: remember-me;
        }

        & .passwordHelp {
            grid-area: password-help;
        }

        & .loginButton {
            grid-area: login-button;
        }

        & .register {
            grid-area: register;
        }
    }
`
class Login extends Component {
    componentDidMount() {
        const token = this.props.getAccessTokenFromStorage()
        if (token) this.props.parseToken(token)
    }

    render() {
        const {
            handleSubmit, tryLogin, email, hasAuthError,
            gotoPasswordHelp, gotoRegistration, rememberMe,
            showRegistration, toggleRememberMe, loading
        } = this.props

        return (
            <FullPageWrapper>
                <StyledForm onSubmit={handleSubmit(tryLogin)}>
                    <header className="loginHeader">{hasAuthError ? <AuthError /> : <Logo />}</header>
                    <ReduxFormField
                        className="email"
                        placeholder="email"
                        name="email"
                        type="email"
                        value={email}
                    />
                    <ReduxFormField
                        className="password"
                        placeholder="password"
                        type="password"
                        name="password"
                    />
                    <FormField
                        className="rememberMe"
                        label="Remember Me"
                        type="checkbox"
                        name="rememberMe"
                        checked={rememberMe}
                        handlers={{onChange: toggleRememberMe}}
                    />
                    <Link className="passwordHelp" href="#" onClick={gotoPasswordHelp}>
                        Password Help
                    </Link>
                    <SpinningButton inProgress={loading} className="loginButton" type="submit">
                        Login
                    </SpinningButton>
                    {showRegistration && (
                        <Link className="register" href="#" onClick={gotoRegistration}>
                            Need an Account?
                        </Link>
                    )}
                </StyledForm>
            </FullPageWrapper>
        )
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryLogin: PropTypes.func.isRequired,
    getAccessTokenFromStorage: PropTypes.func.isRequired,
    gotoPasswordHelp: PropTypes.func.isRequired,
    gotoRegistration: PropTypes.func.isRequired,
    email: PropTypes.string,
    hasAuthError: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    parseToken: PropTypes.func.isRequired,
    rememberMe: PropTypes.bool,
    showRegistration: PropTypes.bool.isRequired,
    toggleRememberMe: PropTypes.func.isRequired
}

Login.defaultProps = {
    hasAuthError: false,
    showRegistration: false,
    loading: false
}

export default Login
