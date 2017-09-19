import {path} from 'ramda'
import {ApolloClient, createNetworkInterface} from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'

export default ({
    baseUrl = 'localhost',
    useSubscriptionsToo = true,
    parseTokenFromStorage = true
} = {}) => {
    const networkInterface = createNetworkInterface({uri: `http://${baseUrl}/graphql`})

    if (parseTokenFromStorage) {
        networkInterface.use([{
            applyMiddleware(req, next) {
                if (!path(['options', 'headers'], req)) {
                    req.options.headers = {}
                }
                req.options.headers['x-token'] = localStorage.getItem('token')
                next()
            }
        }])
    }

    if (useSubscriptionsToo) {
        const wsClient = new SubscriptionClient(`ws://${baseUrl}/subscriptions`, {reconnect: true})
        return new ApolloClient({
            networkInterface: addGraphQLSubscriptions(networkInterface, wsClient)
        })
    }

    return new ApolloClient({networkInterface})
}
