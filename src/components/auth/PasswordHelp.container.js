import {connect} from 'react-redux'
import {reduxForm} from 'redux-form'
import {graphql} from 'react-apollo'

import PasswordHelp from './PasswordHelp'
import validators from './validators'
import {PASSWORD_RESET} from './mutations'
import ducks from './ducks'

const {passwordHelp: {validate}} = validators
const {selectors, creators: {handleError, passwordHelp}} = ducks
const mapStateToProps = state => ({email: selectors.email(state)})
const mapDispatchToProps = {handleError, passwordHelp}

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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordHelpWithData)
