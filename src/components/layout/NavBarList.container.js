import {path} from 'ramda'
import {connect} from 'react-redux'
import {renderConditional} from '../common/Conditional'

import NavBarList from './NavBarList'

const mapStateToProps = (store) => ({
    items: path(['auth', 'menu', 'navigation'], store),
    condition: !!path(['auth', 'user', 'id'], store)
})

export default connect(mapStateToProps)(renderConditional(NavBarList))
