import React from 'react'
import PropTypes from 'prop-types'

import './Registration.css'
import Logo from '../common/Logo'
import ReduxFormField from '../common/FormField'

const Registration = ({handleSubmit, register}) =>
    <form className='registrationForm' onSubmit={handleSubmit(register)}>
        <Logo />
        <p className='instructions'>Register Your Account</p>
        <ReduxFormField className='name' placeholder='name' name='name' />
        <ReduxFormField className='email' placeholder='email' name='email' type='email' />
        <ReduxFormField className='password' placeholder='password' type='password' name='password' />
        <button className='registrationButton' type='submit'>Register</button>
    </form>

Registration.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
}

export default Registration
