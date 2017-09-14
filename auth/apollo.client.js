function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  head.appendChild(style);
  
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  return returnValue;
}

import { path } from 'ramda';
import { ApolloClient, createNetworkInterface } from 'react-apollo';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

var apollo_client = (function () {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === undefined ? 'localhost' : _ref$baseUrl,
        _ref$useSubscriptions = _ref.useSubscriptionsToo,
        useSubscriptionsToo = _ref$useSubscriptions === undefined ? true : _ref$useSubscriptions,
        _ref$parseTokenFromSt = _ref.parseTokenFromStorage,
        parseTokenFromStorage = _ref$parseTokenFromSt === undefined ? true : _ref$parseTokenFromSt;

    var networkInterface = createNetworkInterface({ uri: 'http://' + baseUrl + '/graphql' });

    if (parseTokenFromStorage) {
        networkInterface.use([{
            applyMiddleware: function applyMiddleware(req, next) {
                if (!path(['options', 'headers'], req)) {
                    req.options.headers = {};
                }
                req.options.headers['x-token'] = localStorage.getItem('token');
                next();
            }
        }]);
    }

    if (useSubscriptionsToo) {
        var wsClient = new SubscriptionClient('ws://' + baseUrl + '/subscriptions', { reconnect: true });
        return new ApolloClient({
            networkInterface: addGraphQLSubscriptions(networkInterface, wsClient)
        });
    }

    return new ApolloClient({ networkInterface: networkInterface });
});

export default apollo_client;
//# sourceMappingURL=apollo.client.js.map
