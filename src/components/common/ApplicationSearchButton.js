import React from 'react'
import Icon from '../common/Icon'
import searchicon from '../common/searchicon.svg'


const ApplicationSearch = props =>
    <Icon
        className="search-icon"
        imgSrc={(searchicon && searchicon.src) || searchicon}
        alt="S"
        {...props}
    />

export default ApplicationSearch
