import {path} from 'ramda'
import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'
import Validator from 'validatorjs'

import PasswordHelp from './PasswordHelp'
import {handleError, cancel, passwordHelp} from './actions'
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
    cancel() {
        return dispatch(cancel())
    },
    handleError(error) {
        return dispatch(handleError(error))
    },
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
            try {
                const {data: {error, passwordReset}} = await mutate({variables: user})
                if (error) {
                    throw new Error(error)
                }
                if (passwordReset) ownProps.passwordHelp(user)
            } catch (err) {
                ownProps.handleError(err)
            }
        }

    })
})(FormedPasswordHelp)

export default connect(
    null,
    mapDispatchToProps
)(PasswordHelpWithData)
