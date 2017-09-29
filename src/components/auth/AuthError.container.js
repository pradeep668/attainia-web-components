import {connect} from 'react-redux'
import {clearError} from './actions'
import AuthError from './AuthError'

const mapStateToProps = state => ({
    error: state.auth.error
})

export default connect(mapStateToProps, {clearError})(AuthError)
