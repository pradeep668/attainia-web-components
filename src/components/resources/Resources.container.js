import {path} from 'ramda'
import {connect} from 'react-redux'

import {findAllResources} from './actions'
import Resources from './Resources'
import {renderConditional} from '../common/Conditional'

const mapStateToProps = state => ({
    resources: state.resources.listing,
    condition: !!path(['auth', 'user', 'id'], state)
})

export default connect(mapStateToProps, {findAllResources})(renderConditional(Resources))
