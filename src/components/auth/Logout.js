import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonLink} from '../common'

const Logout = ({tryLogout, asLink}) => (
    asLink ? <ButtonLink onClick={tryLogout}>Logout</ButtonLink>
    : <Button onClick={tryLogout} type="button">Logout</Button>
)

Logout.propTypes = {
    tryLogout: PropTypes.func.isRequired,
    asLink: PropTypes.bool.isRequired
}

Logout.defaultProps = {
    asLink: false
}

export default Logout
