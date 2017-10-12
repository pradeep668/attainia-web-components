import {path} from 'ramda'
import {connect} from 'react-redux'

import NavBarList from './NavBarList'

const mapStateToProps = (store) => ({
    items: path(['auth', 'menu', 'navigation'], store)
})

export default connect(mapStateToProps)(NavBarList)
