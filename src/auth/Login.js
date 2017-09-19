import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../common/Button'
import Logo from '../common/Logo'
import Form from '../common/Form'
import Link from '../common/Link'
import ReduxFormField from '../common/ReduxFormField'
import {breakpoints, forms} from '../common/constants'

const StyledForm = styled(Form)`
    & > * {
        margin: ${forms.formItemMargin}
    }

    & .attainiaLogo {
        margin: 30px auto 15px auto;
    }

    & .passwordHelp {
        text-align: right;
    }

    & .register, & .loginButton {
        text-align: center;
    }

    @supports not (display: grid) {
        .attainiaLogo, .email, .password, .register, .rememberMe, .passwordHelp, .loginButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${breakpoints.desktop} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "header-logo header-logo"
              "email email"
              "password password"
              "remember-me password-help"
              "login-button login-button"
              "register register";

            & .attainiaLogo {
                grid-area: header-logo;
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
    }
`
const Login = ({handleSubmit, tryLogin, email, gotoPasswordHelp, gotoRegistration}) =>
    <StyledForm onSubmit={handleSubmit(tryLogin)}>
        <Logo className='attainiaLogo' />
        <ReduxFormField className='email' placeholder='email' name='email' type='email' value={email} />
        <ReduxFormField className='password' placeholder='password' type='password' name='password' />
        <ReduxFormField className='rememberMe' label='Remember Me' type='checkbox' name='remember' />
        <Link className='passwordHelp' href='#' onClick={gotoPasswordHelp}>Password Help</Link>
        <Button className='loginButton' type='submit'>Login</Button>
        <Link className='register' href='#' onClick={gotoRegistration}>Need an Account?</Link>
    </StyledForm>

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryLogin: PropTypes.func.isRequired,
    gotoPasswordHelp: PropTypes.func.isRequired,
    gotoRegistration: PropTypes.func.isRequired,
    email: PropTypes.string
}

export default Login
