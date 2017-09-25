import {path} from 'ramda'
import {connect} from 'react-redux'
import {graphql} from 'react-apollo'
import {renderConditional} from '../common/Conditional'

import Refresher from './Refresher'
import {REFRESH_TOKEN} from './mutations'
import {handleError, login, refresh, clearRefresh} from './actions'

const mapStateToProps = store => ({
    token: path(['auth', 'user', 'token', 'access_token'], store),
    refreshInMs: Number(path(['auth', 'user', 'token', 'refreshInMs'], store)),
    condition: store.auth.status === 'login'
})

const withMutation = graphql(REFRESH_TOKEN, {
    props: ({ownProps, mutate}) => ({
        async tryRefresh() {
            try {
                const {data: {error, refreshUser}} = await mutate({variables: ownProps.token})
                if (error) {
                    throw new Error(error)
                }
                if (refreshUser) {
                    const {token} = refreshUser
                    if (token) {
                        const refreshInMs = Math.max((Number(token.expires_in) - 10) * 1000, 0)
                        ownProps.login({
                            ...refreshUser,
                            token: {
                                ...token,
                                refreshInMs,
                                refreshAt: new Date(Date.now() + refreshInMs)
                            }
                        })
                    } else {
                        ownProps.login(refreshUser)
                    }
                }
                ownProps.clearRefresh()
            } catch (err) {
                ownProps.handleError(err)
            }
        }
    })
})(Refresher)

const withReduxProps = connect(mapStateToProps, {
    clearRefresh,
    handleError,
    login,
    refresh
})(withMutation)

export default renderConditional(withReduxProps)
