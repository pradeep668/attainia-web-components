import {connect} from 'react-redux'

import {removeResource, findResource} from './actions'
import ResourcesDetail from './ResourcesDetail'

const mapStateToProps = (state, ownProps) => ({
    id: ownProps.match.params.id,
    resource: state.resources.detail
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    getResource(id) {
        return dispatch(findResource(id))
    },
    deleteResource(id) {
        dispatch(removeResource(id))
        return ownProps.history.push('/resources')
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(ResourcesDetail)
