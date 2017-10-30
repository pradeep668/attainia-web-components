import {Component} from 'react'
import PropTypes from 'prop-types'

class Refresher extends Component {
    componentDidMount() {
        if (this.props.token) {
            this.props.queueNextRefresh(this.props)
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token && nextProps.token !== this.props.token) {
            this.props.queueNextRefresh(nextProps)
        }
    }

    render() {
        return this.props.children
    }
}

Refresher.propTypes = {
    children: PropTypes.node,
    token: PropTypes.string,
    queueNextRefresh: PropTypes.func
}

export default Refresher
