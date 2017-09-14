import {connect} from 'react-redux'

import Routes from './Routes'

export default connect(store => ({route: store.auth.route}))(Routes)
