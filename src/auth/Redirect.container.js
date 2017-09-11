import {connect} from 'react-redux'

import RedirectHome from './Redirect'

export default connect(store => ({
    redirect_uri: store.auth.redirect_uri
}))(RedirectHome)
