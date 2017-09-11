import React from 'react'
import PropTypes from 'prop-types'

import './RegisterApplication.css'
import Logo from '../common/Logo'
import ReduxFormField from '../common/FormField'

const RegisterApplication = ({handleSubmit, tryRegisterApp}) =>
    <form className='registerApplication' onSubmit={handleSubmit(tryRegisterApp)}>
        <Logo />
        <p className='instructions'>Register Your Application</p>
        <ReduxFormField className='applicationName' placeholder='name' name='name' />
        <ReduxFormField className='redirect' placeholder='redirects to' name='redirect' type='url' />
        <button className='registerApplicationButton' type='submit'>Register</button>
    </form>

RegisterApplication.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryRegisterApp: PropTypes.func.isRequired
}

export default RegisterApplication
