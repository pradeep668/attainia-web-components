import React from 'react'
import styled from 'styled-components'
import logo from './logo.png'

const Img = styled.img`
    width: 150px;
    height: 39px;
    display: block;
`

const Logo = props =>
    <Img alt='attainia logo' src={logo.src} {...props} />

export default Logo
