import React from 'react'
import Icon from '../common/Icon'
import documenticon from '../common/documenticon.svg'


const Document = props =>
    <Icon
        className="document-icon"
        imgSrc={(documenticon && documenticon.src) || documenticon}
        alt="S"
        {...props}
    />

export default Document
