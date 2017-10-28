import {compose, path, isNil} from 'ramda'
import {isNotNil} from 'ramda-adjunct'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

import {withTokenParsing} from './ParseTokenFromStorage.container'
import {withWriteTokenToStorage} from './WriteTokenToStorage.container'
import {withTokenValidation} from './Validator.container'
import {withTokenInfo} from './TokenInfo.container'
import {withTokenRefresh} from './Refresher.container'

const locationHelper = locationHelperBuilder({})

export const withAuthentication = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => isNotNil(path(['auth', 'user', 'id'], state)),
    wrapperDisplayName: 'Authenticator'
})

export const untilAuthenticatedAndThenRedirectBack = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/',
    allowRedirectBack: false,
    authenticatedSelector: state => isNil(path(['auth', 'user', 'id'], state)),
    wrapperDisplayName: 'UntilAuthenticatedAndThenRedirectBack'
})

export const untilAuthenticated = connectedRouterRedirect({
    redirectPath: '/',
    allowRedirectBack: false,
    authenticatedSelector: state => isNil(path(['auth', 'user', 'id'], state)),
    wrapperDisplayName: 'UntilAuthenticated'
})

export const withLoginDecorators = compose(
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing,
    untilAuthenticatedAndThenRedirectBack
)

export default {
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing,
    untilAuthenticated,
    untilAuthenticatedAndThenRedirectBack,
    withWriteTokenToStorage,
    withAuthentication
}
