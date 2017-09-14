import {gql} from 'react-apollo'

export const IS_LOGGED_IN = gql`
    subscription isLoggedIn($token: String!) {
        isLoggedIn(token: $token)
    }
`
export const TOKEN_TIMEOUT = gql`
    subscription tokenTimeout($token: String!) {
        tokenTimeout(token: $token)
    }
`
