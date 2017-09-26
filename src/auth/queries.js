import {gql} from 'react-apollo'

export const GET_EMAIL = gql`
    query getEmail($token: String!) {
        getEmail(token: $token) {
            email
        }
    }
`
export const VALIDATE_TOKEN = gql`
    query validateToken($token: String!) {
        validateToken(token: $token)
    }
`
export const GET_TOKEN_INFO = gql`
    query getTokenInfo($token: String!) {
        getTokenInfo(token: $token) {
            active
            scope
            exp
            user {
                id
                email
            }
        }
    }
`
