import React from 'react'
import PropTypes from 'prop-types'

import './RegisterApplication.css'
import Logo from '../common/Logo'
import FormField from '../common/FormField'

const RegisterApplication = ({handleSubmit, registerApplication}) =>
    <form className='registerApplication' onSubmit={handleSubmit(registerApplication)}>
        <Logo />
        <p className='instructions'>Register Your Application</p>
        <FormField className='applicationName' placeholder='name' name='name' />
        <FormField className='redirect' placeholder='redirects to' name='redirect' type='url' />
        <button className='registerApplicationButton' type='submit'>Register</button>
    </form>

RegisterApplication.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    registerApplication: PropTypes.func.isRequired
}

export default RegisterApplication
