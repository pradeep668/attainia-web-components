import React from 'react'
import PropTypes from 'prop-types'

import './PasswordHelp.css'
import Logo from '../common/Logo'
import ReduxFormField from '../common/FormField'

const PasswordHelp = ({handleSubmit, tryPasswordHelp, email}) =>
    <form className='passwordHelpForm' onSubmit={handleSubmit(tryPasswordHelp)}>
        <Logo />
        <ReduxFormField className='email' placeholder='email' name='email' type='email' value={email} />
        <button className='passwordHelpButton' type='submit'>Request Password Reset Link</button>
    </form>

PasswordHelp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryPasswordHelp: PropTypes.func.isRequired,
    email: PropTypes.string
}

export default PasswordHelp
