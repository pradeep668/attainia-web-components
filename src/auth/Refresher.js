import {Component} from 'react'
import PropTypes from 'prop-types'

class Refresher extends Component {
    componentWillMount() {
        const {tryRefresh, refreshInMs, token, refresh} = this.props
        refresh(setTimeout(() => tryRefresh(token), refreshInMs))
    }

    componentWillUpdate() {
        const {tryRefresh, refreshInMs, token, refresh} = this.props
        refresh(setTimeout(() => tryRefresh(token), refreshInMs))
    }

    componentWillUnmount() {
        this.props.clearRefresh()
    }

    render() {
        return this.props.children
    }
}

Refresher.propTypes = {
    children: PropTypes.node,
    clearRefresh: PropTypes.func,
    refresh: PropTypes.func,
    refreshInMs: PropTypes.number,
    token: PropTypes.string,
    tryRefresh: PropTypes.func
}

export default Refresher
