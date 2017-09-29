import {connect} from 'react-redux'

import {findAllResources} from './actions'
import ResourcesList from './ResourcesList'

const mapStateToProps = state => ({
    resources: state.resources.listing
})

export default connect(mapStateToProps, {findAllResources})(ResourcesList)
