import React from 'react'
import PropTypes from 'prop-types'
import Button from '../common/Button'

const Logout = ({tryLogout}) =>
    <Button onClick={tryLogout} type='button'>Logout</Button>

Logout.propTypes = {
    tryLogout: PropTypes.func.isRequired
}

export default Logout
