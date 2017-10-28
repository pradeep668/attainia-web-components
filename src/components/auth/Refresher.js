import {Component} from 'react'
import PropTypes from 'prop-types'
import {REFRESH_TOKEN} from './mutations'

const tryRefresh = async ({token, handleError, updatedToken, client}) => {
    try {
        const {data: {error, refreshUser}} = await client.mutate({
            mutation: REFRESH_TOKEN,
            variables: {token}
        })
        if (error) {
            throw new Error(error)
        }
        if (refreshUser) {
            const refreshInMs = Math.max((Number(refreshUser.expires_in || 3600) - 10) * 1000, 0)
            updatedToken({
                ...refreshUser,
                refreshInMs,
                refreshAt: new Date(Date.now() + refreshInMs)
            })
        }
    } catch (err) {
        handleError(err)
    }
}

class Refresher extends Component {
    componentDidMount() {
        if (this.props.token) {
            const {refreshInMs, refresh, ...refreshProps} = this.props
            refresh(setTimeout(() => this.props.token && refreshInMs && tryRefresh(refreshProps), refreshInMs))
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token) {
            const {refreshInMs, refresh, ...refreshProps} = nextProps
            this.props.refresh(
                setTimeout(() => nextProps.token && refreshInMs && tryRefresh(refreshProps), refreshInMs)
            )
        }
    }

    render() {
        return this.props.children
    }
}

Refresher.propTypes = {
    children: PropTypes.node,
    refresh: PropTypes.func,
    refreshInMs: PropTypes.number,
    token: PropTypes.string
}

Refresher.defaultProps = {
    refreshInMs: 3600
}

export default Refresher
