import React from 'react'
import './Logo.css'
import logo from './logo.png'

const Logo = props =>
    <img className='attainiaLogo' alt='attainia logo' src={logo.src} {...props} />

export default Logo
