import {path} from 'ramda'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import {renderConditional} from '../common/Conditional'

import Refresher from './Refresher'
import {REFRESH_TOKEN} from './mutations'
import {handleError, updatedToken, refresh, clearRefresh} from './actions'

const mapStateToProps = store => ({
    token: path(['auth', 'user', 'token', 'access_token'], store),
    refreshInMs: Number(path(['auth', 'user', 'token', 'refreshInMs'], store)),
    condition: store.auth.status === 'login'
})

const withMutation = graphql(REFRESH_TOKEN, {
    props: ({ownProps, mutate}) => ({
        async tryRefresh(token) {
            try {
                const {data: {error, refreshUser}} = await mutate({variables: {token}})
                if (error) {
                    throw new Error(error)
                }
                if (refreshUser) {
                    const refreshInMs = Math.max((Number(refreshUser.expires_in) - 10) * 1000, 0)
                    ownProps.updatedToken({
                        ...refreshUser,
                        refreshInMs,
                        refreshAt: new Date(Date.now() + refreshInMs)
                    })
                }
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(Refresher)

const withReduxProps = connect(mapStateToProps, {
    clearRefresh,
    handleError,
    updatedToken,
    refresh
})(withMutation)

export default renderConditional(withReduxProps)
