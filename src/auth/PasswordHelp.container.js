import {path} from 'ramda'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import PasswordHelp from './PasswordHelp'
import {passwordHelp} from './actions'
import constants from './constants'
import {PASSWORD_RESET} from './mutations'

const {passwordHelp: {rules, messages}} = constants

const validate = (values) => {
    const validator = new Validator(values, rules, messages)
    validator.passes()
    return validator.errors.all()
}

const mapStateToProps = store => ({
    email: path(['auth', 'user', 'email'], store)
})

const mapDispatchToProps = dispatch => ({
    passwordHelp(user) {
        return dispatch(passwordHelp(user))
    }
})

const FormedPasswordHelp = reduxForm({
    validate,
    fields: ['email'],
    form: 'PasswordHelpForm'
})(PasswordHelp)

const PasswordHelpWithData = graphql(PASSWORD_RESET, {
    props: ({mutate, ownProps}) => ({
        async tryPasswordHelp(user) {
            const success = await mutate({variables: user})
            if (success) {
                ownProps.passwordHelp(user)
                ownProps.history.push('/login')
            }
        }

    })
})(FormedPasswordHelp)

export default connect(
    null,
    mapDispatchToProps
)(PasswordHelpWithData)
