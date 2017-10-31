import {compose} from 'ramda'
import {
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing,
    untilAuthenticatedAndThenRedirectBack
} from './decorators'

const withLoginEnhancers = compose(
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing,
    untilAuthenticatedAndThenRedirectBack
)

const withTokenHelpers = compose(
    withTokenRefresh,
    withTokenInfo,
    withTokenValidation,
    withTokenParsing
)

export {
    withLoginEnhancers,
    withTokenHelpers
}
