import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './Login.css'
import Logo from '../common/Logo'
import ReduxFormField from '../common/FormField'

const Login = ({handleSubmit, login}) =>
    <form className='loginForm' onSubmit={handleSubmit(login)}>
        <Logo />
        <ReduxFormField className='email' placeholder='email' name='email' type='email' />
        <ReduxFormField className='password' placeholder='password' type='password' name='password' />
        <ReduxFormField className='rememberMe' label='Remember Me' type='checkbox' name='remember' />
        <Link className='passwordHelp link' to='/password-help'>Password Help</Link>
        <button className='loginButton' type='submit'>Login</button>
        <Link className='register link' to='/register'>Need an Account?</Link>
    </form>

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

export default Login
