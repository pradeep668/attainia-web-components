import {path} from 'ramda'
import {ApolloClient, createNetworkInterface} from 'react-apollo'
import {SubscriptionClient, addGraphQLSubscriptions} from 'subscriptions-transport-ws'

export default ({
    baseUrl = 'localhost',
    storage = 'local',
    useSubscriptions = true
} = {}) => {
    const networkInterface = createNetworkInterface({uri: `http://${baseUrl}/graphql`})

    if (/(local|session)/i.test(storage)) {
        networkInterface.use([{
            applyMiddleware(req, next) {
                if (!path(['options', 'headers'], req)) {
                    req.options.headers = {}
                }
                req.options.headers['x-token'] = (/local/i.test(storage) ? localStorage : sessionStorage).getItem(
                    'token'
                )
                next()
            }
        }])
    }

    if (useSubscriptions) {
        const wsClient = new SubscriptionClient(`ws://${baseUrl}/subscriptions`, {reconnect: true})
        return new ApolloClient({
            networkInterface: addGraphQLSubscriptions(networkInterface, wsClient)
        })
    }

    return new ApolloClient({networkInterface})
}
