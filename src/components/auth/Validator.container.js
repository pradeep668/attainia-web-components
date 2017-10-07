import {path} from 'ramda'
import {connect} from 'react-redux'
import {compose, graphql, withApollo} from 'react-apollo'

import {handleError, logout, login} from './actions'
import {VALIDATE_TOKEN} from './queries'
import Validator from './Validator'

const mapStateToProps = state => ({
    noUserId: !path(['auth', 'user', 'id'], state)
})

export default compose(
    withApollo,
    graphql(VALIDATE_TOKEN, {
        options: ({token}) => ({
            variables: {token}
        })
    }),
    connect(
        mapStateToProps,
        {logout, login, handleError}
    )
)(Validator)
