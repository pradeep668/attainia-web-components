import {path} from 'ramda'
import {connect} from 'react-redux'

import Auth from './Auth'

export default connect(store => ({
    tokenInStore: path(['auth', 'user', 'token', 'access_token'], store),
    isLoggedOut: store.auth.status === 'logout',
    rememberMe: !!store.auth.rememberMe,
    user: store.auth.user
}))(Auth)
