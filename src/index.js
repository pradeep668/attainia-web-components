import {render} from 'react-dom'
import AppRoutes from './routes/AppRoutes'
import './globals'

function renderApp(Component) {
    render(Component, document.querySelector('#app-root'))
}

renderApp(AppRoutes)

if (module && module.hot) {
    module.hot.accept('./routes/AppRoutes', () => {
        /* eslint "global-require": "off" */
        const DevRoutes = require('./routes/AppRoutes').default
        renderApp(DevRoutes)
    })
}
