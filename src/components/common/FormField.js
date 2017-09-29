/* Not sure when eslint-plugin-react will fix their issue https://github.com/yannickcr/eslint/eslint-plugin-react/issues/1187 */
/* eslint "react/jsx-indent-props": "off" */

import uuid from 'uuid/v4'
import {pickBy} from 'ramda'
import {isNotNil} from 'ramda-adjunct'

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FieldError from './FieldError'
import InputField from './InputField'
import CheckboxLabel from './CheckboxLabel'

const isCheck = type => /checkbox/i.test(type)

const FieldWrapper = styled.div`
    ${props => isCheck(props.type) && 'width: 16px;'} 
    ${props => isCheck(props.type) && 'position: relative;'} 
`

const FormField = ({
    handlers, input, id, meta: {touched, error}, label, name, placeholder, type, value, className
}) =>
    <FieldWrapper type={type} className={`${className}`}>
        {isNotNil(label) && !isCheck(type) && <label htmlFor={id}>{label}</label>}
        <InputField {...pickBy(isNotNil, {id, value, type, placeholder, name, ...input, ...handlers})} />
        {isNotNil(label) && isCheck(type) && <CheckboxLabel htmlFor={id}>{label}</CheckboxLabel>}
        {touched && error && <FieldError>{error}</FieldError>}
    </FieldWrapper>

FormField.propTypes = {
    handlers: PropTypes.shape({
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onDragStart: PropTypes.func,
        onDrop: PropTypes.func,
        onFocus: PropTypes.func,
        onUpdate: PropTypes.func
    }),
    meta: PropTypes.shape({
        active: PropTypes.bool,
        checked: PropTypes.bool,
        dirty: PropTypes.bool,
        error: PropTypes.arrayOf(PropTypes.string),
        invalid: PropTypes.bool,
        pristine: PropTypes.bool,
        touched: PropTypes.bool,
        valid: PropTypes.bool,
        visited: PropTypes.bool
    }),
    className: PropTypes.string,
    input: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object
    ]),
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
    ])
}

FormField.defaultProps = {
    meta: {},
    handlers: {},
    input: {},
    id: uuid(),
    className: ''
}

export default FormField
