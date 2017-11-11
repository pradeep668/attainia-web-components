import {path, isNil} from 'ramda'
import {isNotNil} from 'ramda-adjunct'
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'

export {withJwtDecode} from './JwtDecode.container'
export {withTokenParsing} from './ParseTokenFromStorage.container'
export {withWriteTokenToStorage} from './WriteTokenToStorage.container'
export {withTokenValidation} from './Validator.container'
export {withTokenInfo} from './TokenInfo.container'
export {withTokenRefresh} from './Refresher.container'
export {withAuthStatusSubscription} from './AuthStatus.container'

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
