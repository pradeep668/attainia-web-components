import {connect} from 'react-redux'
import AuthError from './AuthError'
import ducks from './ducks'

const {selectors, creators: {clearError}} = ducks
const mapStateToProps = state => ({error: selectors.error(state)})

export default connect(mapStateToProps, {clearError})(AuthError)
