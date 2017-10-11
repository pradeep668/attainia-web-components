import {pickBy} from 'ramda'
import {isNotNil} from 'ramda-adjunct'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors} from './constants'

const Span = ({className, children}) =>
    <span className={className}>{children}</span>

const StyledSpan = styled(Span)`
    padding-left: 22px 
`
Span.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired
}

const Label = ({className, children, htmlFor, onClick}) =>
    <label htmlFor={htmlFor} className={className} {...pickBy(isNotNil, {onClick})}>
        <StyledSpan>{children}</StyledSpan>
    </label>

Label.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string.isRequired,
    htmlFor: PropTypes.string.isRequired,
    onClick: PropTypes.func
}

const CheckboxLabel = styled(Label)`
    width: 16px;
    height: 16px;
    position: absolute;
    cursor: pointer;
    white-space: nowrap;
    top: 0;
    left: 0;
    background: white;
    opacity: 1;

    &:after {
        box-sizing: unset;
        content: '';
        width: 6px;
        height: 3px;
        position: absolute;
        top: 4px;
        left: 4px;
        border: 3px solid ${colors.rossoCorsa};
        border-top: none;
        border-right: none;
        background: transparent;
        opacity: 0;
        transform: rotate(-45deg);
    }
    &:hover::after {
        box-sizing: unset;
        opacity: 0.4;
    }
`

CheckboxLabel.propTypes = {
    children: PropTypes.node,
    htmlFor: PropTypes.string.isRequired
}

export default CheckboxLabel
