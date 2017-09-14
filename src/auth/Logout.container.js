import {path} from 'ramda'
import {graphql} from 'react-apollo'
import {connect} from 'react-redux'

import Logout from './Logout'
import {logout} from './actions'
import {LOGOUT_USER} from './mutations'

const LogoutWithData = graphql(LOGOUT_USER, {
    props: ({mutate, ownProps}) => ({
        async tryLogout() {
            const success = await mutate({variables: {token: ownProps.token}})
            if (success) {
                ownProps.logoutUser()
                ownProps.history.push('/login')
            }
        }
    })
})(Logout)

const mapStoreToProps = store => ({
    token: path(['auth', 'user', 'access_token'], store) 
})

const mapDispatchToProps = dispatch => ({
    logoutUser(token) {
        return dispatch(logout(token))
    }
})

export default connect(mapStoreToProps, mapDispatchToProps)(LogoutWithData)
