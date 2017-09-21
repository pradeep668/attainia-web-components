import {connect} from 'react-redux'
import {clearError} from './actions'
import AuthError from './AuthError'

const mapStateToProps = state => ({
    error: state.auth.error
})

const mapDispatchToProps = dispatch => ({
    clearError() {
        return dispatch(clearError())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthError)
