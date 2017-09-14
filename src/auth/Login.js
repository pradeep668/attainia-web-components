import React from 'react'
import PropTypes from 'prop-types'

import './Login.css'
import Logo from '../common/Logo'
import ReduxFormField from '../common/FormField'

const Login = ({handleSubmit, tryLogin, email, gotoPasswordHelp, gotoRegistration}) =>
    <form className='loginForm' onSubmit={handleSubmit(tryLogin)}>
        <Logo />
        <ReduxFormField className='email' placeholder='email' name='email' type='email' value={email} />
        <ReduxFormField className='password' placeholder='password' type='password' name='password' />
        <ReduxFormField className='rememberMe' label='Remember Me' type='checkbox' name='remember' />
        <a className='passwordHelp link' href='#' onClick={gotoPasswordHelp}>Password Help</a>
        <button className='loginButton' type='submit'>Login</button>
        <a className='register link' href='#' onClick={gotoRegistration}>Need an Account?</a>
    </form>

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryLogin: PropTypes.func.isRequired,
    gotoPasswordHelp: PropTypes.func.isRequired,
    gotoRegistration: PropTypes.func.isRequired,
    email: PropTypes.string
}

export default Login
