import {path} from 'ramda'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'

import Logout from './Logout'
import {logout, handleError} from './actions'
import {LOGOUT_USER} from './mutations'
import {removeToken, getAccessTokenFromStorage} from './helpers'

const LogoutWithData = graphql(LOGOUT_USER, {
    props: ({mutate, ownProps}) => ({
        async tryLogout() {
            try {
                const token = ownProps.token || getAccessTokenFromStorage()
                if (token) {
                    await mutate({variables: {token}})
                }
                removeToken()
                ownProps.logout()
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(Logout)

const mapStoreToProps = store => ({
    token: path(['auth', 'user', 'token', 'access_token'], store)
})

const mapDispatchToProps = {handleError, logout}

export default connect(mapStoreToProps, mapDispatchToProps)(LogoutWithData)
