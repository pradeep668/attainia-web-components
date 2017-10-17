import {gql} from 'react-apollo'

export default gql`
    subscription isLoggedOut($token: String!) {
        isLoggedOut(token: $token)
    }
`
