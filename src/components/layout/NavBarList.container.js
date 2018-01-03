import {path} from 'ramda'
import {connect} from 'react-redux'
import {renderConditional} from '../common'
import ducks from '../auth/ducks'

import NavBarList from './NavBarList'

const mapStateToProps = (store) => ({
    items: path(['auth', 'menu', 'navigation'], store),
    condition: ducks.selectors.isAuthenticated(store)
})

export default connect(mapStateToProps)(renderConditional(NavBarList))
