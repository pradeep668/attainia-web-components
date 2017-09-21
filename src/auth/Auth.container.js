import {path} from 'ramda'
import {connect} from 'react-redux'

import Auth from './Auth'

export default connect(store => ({
    isLoggedIn: !!path(['auth', 'user', 'token', 'access_token'], store),
    isLoggedOut: store.auth.status === 'logout',
    user: store.auth.user
}))(Auth)
