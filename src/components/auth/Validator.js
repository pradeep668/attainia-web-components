import {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {VALIDATE_TOKEN} from './queries'
import {removeToken} from './helpers'

const validateToken = async ({token, client, logout, handleError}) => {
    try {
        const {data} = await client.query({
            query: VALIDATE_TOKEN,
            variables: {token}
        })

        if (!data.validateToken) {
            logout(token)
            removeToken(token)
        }
    } catch (e) {
        handleError(e)
    }
}

class Validator extends PureComponent {
    componentDidMount() {
        if (this.props.token) {
            validateToken(this.props)
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token && nextProps.token !== this.props.token) {
            validateToken(nextProps)
        }
    }

    render() {
        return this.props.children
    }
}

Validator.propTypes = {
    token: PropTypes.string,
    children: PropTypes.node
}

export default Validator
