import {Component} from 'react'
import PropTypes from 'prop-types'

class Refresher extends Component {
    componentWillMount() {
        const {tryRefresh, refreshInMs, token, refresh} = this.props
        refresh(setTimeout(() => token && refreshInMs && tryRefresh(token), refreshInMs))
    }

    componentWillUpdate(nextProps) {
        const {tryRefresh, refresh} = this.props
        const {refreshInMs, token} = nextProps
        refresh(setTimeout(() => token && refreshInMs && tryRefresh(token), refreshInMs))
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

Refresher.defaultProps = {
    refreshInMs: 3600
}

export default Refresher
