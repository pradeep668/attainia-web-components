import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import RegisterApplication from './RegisterApplication'
import {registerApp, cancel} from './actions'
import constants from './constants'
import {REGISTER_APP} from './mutations'

const {applicationRegistration: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)
    validator.passes()
    return validator.errors.all()
}

const mapDispatchToProps = dispatch => ({
    cancel() {
        return dispatch(cancel())
    },
    registerApplication(app) {
        return dispatch(registerApp(app))
    }
})

const FormedApplication = reduxForm({
    validate,
    fields: ['name', 'redirect'],
    form: 'ApplicationRegistrationForm'
})(RegisterApplication)

const RegisterApplicationWithData = graphql(REGISTER_APP, {
    props: ({mutate, ownProps}) => ({
        async tryRegisterApp(app) {
            const success = await mutate({variables: app})
            if (success) ownProps.registerApplication(app)
        }
    })
})(FormedApplication)

export default connect(
    null,
    mapDispatchToProps
)(RegisterApplicationWithData)
