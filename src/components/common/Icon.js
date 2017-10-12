import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Div = styled.div`
    height: 20px;
    width:20px;
`

const Icon = ({className, imgSrc, alt}) =>
    <Div className={className}>
    	<img src={imgSrc} alt={alt} />
	</Div>

Icon.propTypes = {
    className: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

export default Icon
