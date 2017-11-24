import React from 'react'
import {Field} from 'redux-form'
import PropTypes from 'prop-types'
import FormField from './FormField'

const ReduxFormField = props =>
    <Field
      name={props.name}
      component={FormField}
      {...props}
    />

ReduxFormField.propTypes = {
    name: PropTypes.string.isRequired
}

export default ReduxFormField
