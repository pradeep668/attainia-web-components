import {path} from 'ramda'
import {connect} from 'react-redux'
import {renderConditional} from '../common'

import Header from './Header'

const mapStateToProps = store => ({
    condition: !!path(['auth', 'user', 'id'], store)
})

export default connect(mapStateToProps)(renderConditional(Header))
