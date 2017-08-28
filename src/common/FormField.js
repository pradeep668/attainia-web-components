/* Not sure when eslint-plugin-react will fix their issue https://github.com/yannickcr/eslint/eslint-plugin-react/issues/1187 */
/* eslint "react/jsx-indent-props": "off" */

import {pickBy, isNil} from 'ramda';
import React from 'react';
import {Field} from 'redux-form';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';

import './FormField.css';

const isNotNil = val => !isNil(val);
const isCheck = type => /checkbox/i.test(type);

const InputField = props => (
    /textarea/i.test(props.type) ?
        <textarea className='formField' {...props} /> :
        <input checked className='formField' {...props} />
);

InputField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.oneOf([
        'checkbox',
        'color',
        'date',
        'email',
        'month',
        'number',
        'password',
        'radio',
        'reset',
        'search',
        'submit',
        'tel',
        'text',
        'textarea',
        'url',
        'week'
    ])
};

InputField.defaultProps = {
    type: 'text'
};

const FormField = ({
    handlers, input, id, meta: {touched, error}, label, name, placeholder, type, value, className
}) =>
    <div className={`formGroup ${className}${isCheck(type) ? ' squareCheckbox' : ''}`}>
        {label && !isCheck(type) ? <label htmlFor={id}>{label}</label> : null}
        <InputField {...pickBy(isNotNil, {id, value, type, placeholder, name, ...input, ...handlers})} />
        {label && isCheck(type) ? <label htmlFor={id}><span>{label}</span></label> : null}
        {touched && error ? <div className={`${touched && error ? 'fieldError' : ''}`}>{error}</div> : null}
    </div>;

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
    input: PropTypes.element,
    label: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.number,
        PropTypes.string
    ])
};

const ReduxFormField = props =>
    <Field
        name={props.name}
        component={FormField}
        {...props}
    />;

ReduxFormField.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string
};

ReduxFormField.defaultProps = {
    id: uuid()
};

export default ReduxFormField;
