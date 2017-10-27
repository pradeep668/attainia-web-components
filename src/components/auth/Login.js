import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

import AuthError from './AuthError.container'
import SpinningButton from '../common/SpinningButton'
import Form from '../common/Form'
import SimpleSvgIcon from '../common/SimpleSvgIcon'
import ReduxFormField from '../common/ReduxFormField'
import FormField from '../common/FormField'
import {getThemeProp} from '../common/helpers'

const FullPageWrapper = styled.div`
    min-height: 100vh;
    display: grid;
    align-items: center;
`
const StyledForm = styled(Form)`
    & > * {
        margin: ${getThemeProp(['forms', 'formItemMargin'], '5px')};
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
        grid-template-areas: 'header header' 'email email' 'password password'
            ${props => (props.showPasswordHelp ? '"remember-me password-help"' : '"remember-me remember-me"')}
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
class Login extends PureComponent {
    render() {
        const {
            handleSubmit, tryLogin, email, hasAuthError,
            passwordHelpLabel, registrationLabel, rememberMeLabel, loginLabel,
            rememberMe, showPasswordHelp, showRegistration, toggleRememberMe, loading
        } = this.props

        return (
            <FullPageWrapper>
                <StyledForm onSubmit={handleSubmit(tryLogin)} {...this.props}>
                    <header className="loginHeader">
                        {hasAuthError ? <AuthError /> : <SimpleSvgIcon width="161" height="39" icon="primary" />}
                    </header>
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
                        label={rememberMeLabel}
                        type="checkbox"
                        name="rememberMe"
                        checked={rememberMe}
                        value={rememberMe}
                        handlers={{onChange: toggleRememberMe}}
                    />
                    {showPasswordHelp && <Link className="passwordHelp" to="password-help">{passwordHelpLabel}</Link>}
                    <SpinningButton inProgress={loading} className="loginButton" type="submit">
                        {loginLabel}
                    </SpinningButton>
                    {showRegistration && <Link className="register" to="register">{registrationLabel}</Link>}
                </StyledForm>
            </FullPageWrapper>
        )
    }
}

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryLogin: PropTypes.func.isRequired,
    registrationLabel: PropTypes.string.isRequired,
    passwordHelpLabel: PropTypes.string.isRequired,
    rememberMeLabel: PropTypes.string.isRequired,
    loginLabel: PropTypes.string.isRequired,
    email: PropTypes.string,
    hasAuthError: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    rememberMe: PropTypes.bool,
    showPasswordHelp: PropTypes.bool.isRequired,
    showRegistration: PropTypes.bool.isRequired,
    toggleRememberMe: PropTypes.func.isRequired
}

Login.defaultProps = {
    hasAuthError: false,
    passwordHelpLabel: 'Password Help',
    registrationLabel: 'Need an Account?',
    rememberMeLabel: 'Remember Me',
    loginLabel: 'Login',
    showPasswordHelp: true,
    showRegistration: false,
    loading: false
}

export default Login
