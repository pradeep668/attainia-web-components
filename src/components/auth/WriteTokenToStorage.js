import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {setToken, getAccessTokenFromStorage} from './helpers'

class WriteTokenToStorage extends PureComponent {
    componentDidMount() {
        if (this.props.token) {
            setToken(this.props.token, this.props.storageType)
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token) {
            const existingTokenInStorage = getAccessTokenFromStorage(nextProps.storageType)
            if (existingTokenInStorage !== nextProps.token) {
                setToken(this.props.token, this.props.storageType)
            }
        }
    }

    render() {
        return this.props.children
    }
}

WriteTokenToStorage.propTypes = {
    children: PropTypes.node,
    token: PropTypes.string,
    storageType: PropTypes.oneOf(['local', 'session', 'none'])
}

export default WriteTokenToStorage
