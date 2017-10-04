import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import Validator from 'validatorjs'

import {createResource} from './actions'
import ResourcesNew from './ResourcesNew'

const rules = {
    name: 'required'
}

const messages = {
    'required.name': 'Enter a resource name'
}

const validate = (values) => {
    const validator = new Validator(values, rules, messages)

    validator.passes()

    return validator.errors.all()
}

const mapDispatchToProps = (dispatch, ownProps) => ({
    createResource(values) {
        dispatch(createResource(values))
        ownProps.history.push('/resources')
    }
})

export default reduxForm({
    validate,
    fields: ['name'],
    form: 'ResourcesNewForm'
})(connect(null, mapDispatchToProps)(ResourcesNew))
