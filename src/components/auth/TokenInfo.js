import {path} from 'ramda'
import {PureComponent} from 'react'
import PropTypes from 'prop-types'

import {GET_TOKEN_INFO} from './queries'

const getTokenInfo = async ({client, token, handleError, login}) => {
    try {
        const {data} = await client.query({
            query: GET_TOKEN_INFO,
            variables: {token}
        })
        if (path(['getTokenInfo', 'user'], data)) {
            login({
                ...data.getTokenInfo.user,
                token: {
                    access_token: token
                }
            })
        }
    } catch (e) {
        handleError(e)
    }
}

class TokenInfo extends PureComponent {
    componentDidMount() {
        if (this.props.token) {
            getTokenInfo(this.props)
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token && nextProps.token !== this.props.token) {
            getTokenInfo(nextProps)
        }
    }

    render() {
        return this.props.children
    }
}

TokenInfo.propTypes = {
    children: PropTypes.node,
    token: PropTypes.string
}

export default TokenInfo
