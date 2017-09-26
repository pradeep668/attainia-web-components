import {gql} from 'react-apollo'

export const IS_LOGGED_OUT = gql`
    subscription isLoggedOut($token: String!) {
        isLoggedOut(token: $token)
    }
`
