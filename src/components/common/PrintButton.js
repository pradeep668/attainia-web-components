import React from 'react'
import Icon from '../common/Icon'
import printicon from '../common/printicon.svg'


const Print = props =>
    <Icon
        className="print-icon"
        imgSrc={printicon}
        alt="S"
        {...props}
    />

export default Print
