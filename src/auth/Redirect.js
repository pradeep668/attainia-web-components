import React from 'react'
import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'

const RedirectHome = ({redirect_uri}) => (
    appUrl ?  <Redirect to={redirect_uri} /> : null
)

RedirectHome.propTypes = {
    redirect_uri: PropTypes.string
}

export default RedirectHome
