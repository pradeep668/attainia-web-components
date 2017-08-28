# Attainia Web Components

This repository contains modularized JavaScript and CSS meant to be used in an Attainia web application (built using the React.js framework).

## Installing

```bash
npm install attainia-web-components
```

## Importing JS Components

The React web components in this repository are imported just like any normal local web component:

```javascript
import {Conditional} from 'attainia-web-components/common/Conditional';

export default (props) =>
    <Conditional condition={props.isLoggedIn}>
        <header>
            <h1>{`Welcome ${props.name}!`}</h1>
        </header>
    </Conditional>;
```

In addition to the basic web component files are stylesheets, types, action creators, container components (which wrap the components themselves and inject properties from the Redux store), and local stores/reducers. So you are free to use the naked component itself and inject the required properties it defines, OR you can use the _container_ component if you plan on letting the component use its own store and follow pre-configured behavior (defined in the action creators and reducers).

This just means you need to _add_ the reducers to your own Redux store:

```javascript
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

/* reducer for the `auth` component(s) from this awc library */
import auth from 'attainia-web-components/auth/reducer';

/* your local reducers */
import resources from './components/resources/reducer';

/* combine your local reducers with the reducer(s) for the attain web components */
export default combineReducers({
    auth,
    resources,
    form: formReducer
});
```

Using any container component will then work seamlessly, just import the `.container.js` component, _not_ the naked component itself (which you would need to configure yourself if you wanted more control).

```javascript
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

/* attainia web component */
import Login from 'attainia-web-components/auth/Login.container';

/* the Redux store */
import store from './store';

/* Local component */
import ResourcesList from './components/resources/ResourcesList.container';

export default (
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/home' component={ResourcesList} />
                <Route exact path='/resources' component={ResourcesList} />
            </Switch>
        </BrowserRouter>
    </Provider>
);
```

### Importing non-Transpiled Components

In case you wish to import the pre-transpiled components, you can change your import path (for _any_ component) to pull from the `src/` folder rather than the `/` root directory of the project.


```javascript
import Login from 'attainia-web-components/src/auth/Login';
```

## Importing Root CSS Styles

This repository leverages some shared, Attainia-branded styles in its components, however you can import them directly. Although you will need to handle the PostCSS/CSSNext compilation yourself, you can look at this project's `postcss.config.js` and/or copy that file directly into your own project's webpack build step(s) for PostCSS.

To import directly from this repository's modularized CSS you need to reference
the `src/css/` folder.

```css
@import "attainia-web-components/src/css/buttons.css";

.myCustomButton {
    @apply --btn;
}
```
