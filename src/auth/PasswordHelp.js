import React from 'react';
import PropTypes from 'prop-types';

import './PasswordHelp.css';
import Logo from '../common/Logo';
import FormField from '../common/FormField';

const PasswordHelp = ({handleSubmit, passwordHelp}) =>
    <form className='passwordHelpForm' onSubmit={handleSubmit(passwordHelp)}>
        <Logo />
        <FormField className='email' placeholder='email' name='email' type='email' />
        <button className='passwordHelpButton' type='submit'>Request Password Reset Link</button>
    </form>;

PasswordHelp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    passwordHelp: PropTypes.func.isRequired
};

export default PasswordHelp;
