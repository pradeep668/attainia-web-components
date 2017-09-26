import {Component} from 'react'
import PropTypes from 'prop-types'

class AuthStatus extends Component {
    componentWillMount() {
        this.props.startSubscription()
    }

    render() {
        return this.props.children
    }
}

AuthStatus.propTypes = {
    children: PropTypes.node,
    startSubscription: PropTypes.func
}

export default AuthStatus
