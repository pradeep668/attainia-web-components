import React from 'react'
import PropTypes from 'prop-types'

import './Logout.css'

const Logout = ({tryLogout}) =>
    <button onClick={tryLogout} className='logoutButton' type='button'>Logout</button>

Logout.propTypes = {
    tryLogout: PropTypes.func.isRequired
}

export default Logout
