import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

import './Login.css'
import Logo from '../common/Logo'
import FormField from '../common/FormField'

const Login = ({handleSubmit, login}) =>
    <form className='loginForm' onSubmit={handleSubmit(login)}>
        <Logo />
        <FormField className='email' placeholder='email' name='email' type='email' />
        <FormField className='password' placeholder='password' type='password' name='password' />
        <FormField className='rememberMe' label='Remember Me' type='checkbox' name='remember' />
        <Link className='passwordHelp link' to='/password-help'>Password Help</Link>
        <button className='loginButton' type='submit'>Login</button>
        <Link className='register link' to='/register'>Need an Account?</Link>
    </form>

Login.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

export default Login
