import {path} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import Login from './Login.container'
import {GET_TOKEN_INFO} from './queries'

async function getTokenInfo({client, token, login, logout, handleError}) {
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
        } else {
            logout(token)
        }
    } catch (e) {
        handleError(e)
    }
}

const Validator = (props) => {
    const {noUserId, data: {validateToken}, children} = props

    if (validateToken) {
        if (noUserId) getTokenInfo(props)
        return children
    }

    return <Login {...props} />
}

Validator.propTypes = {
    children: PropTypes.node,
    token: PropTypes.string,
    noUserId: PropTypes.bool,
    data: PropTypes.shape({
        validateToken: PropTypes.bool
    })
}

export default Validator
