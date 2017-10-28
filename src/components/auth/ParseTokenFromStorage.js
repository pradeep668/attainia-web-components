import {Component} from 'react'
import PropTypes from 'prop-types'
import {getAccessTokenFromStorage} from './helpers'

class ParseTokenFromStorage extends Component {
    componentWillMount() {
        const token = getAccessTokenFromStorage()
        if (token && token !== '[object Object]') {
            this.props.parsedToken(token)
        }
    }

    render() {
        return this.props.children
    }
}

ParseTokenFromStorage.propTypes = {
    children: PropTypes.node,
    parsedToken: PropTypes.func.isRequired
}

export default ParseTokenFromStorage
