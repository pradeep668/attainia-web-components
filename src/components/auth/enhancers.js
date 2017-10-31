import {compose} from 'ramda'
import {
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing,
    untilAuthenticatedAndThenRedirectBack
} from './decorators'

export const withLoginEnhancers = compose(
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing,
    untilAuthenticatedAndThenRedirectBack
)

export const withTokenHelpers = compose(
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing
)
