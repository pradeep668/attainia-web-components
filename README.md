# Attainia Web Components

This repository contains modularized JavaScript and CSS meant to be used in an Attainia web application (built using the React.js framework).

## Dependencies

These components are intended to be used in a React.js web application:
* [React](https://github.com/facebook/react)

If you intend to use any of the `.container.js` components it will require the use of:
* [Redux](https://github.com/reactjs/redux) - Unidirectional data flow in a React application
* [React-Redux](https://github.com/reactjs/react-redux) - Bridges React to Redux
* [Redux-Form](https://github.com/erikras/redux-form) - HTML Form helpers and validation that flow into a Redux store
* [Validatorjs](https://github.com/skaterdav85/validatorjs) - Build validation objects that Redux-Form can easily use

Additionally, certain low-level libraries are also servicing these components:
* [Ramda](https://www.npmjs.com/package/ramda) - Utils library (similar to Lodash) but more properly geared towards functional programming paradigms
* [UUID](https://github.com/kelektiv/node-uuid) - Generates guids
* [Axios](https://www.npmjs.com/package/axios) - HTTP requests from the browser

## Installing

```bash
npm install attainia-web-components
```

## Usage 

Many components in this library can be used in two ways. While the actual component is defined in just the JavaScript file after which it is named, there are supplementary files that expand on its functionality which you can choose to use as well.

As an example, the "Login" component consists of a `Login.js`, a `Login.containerjs`. The latter is a component that wraps `Login.js`, mapping properties from a Redux store and wrapping a Redux dispatcher around an action creator object, injecting all of those as properties into the actual `Login.js` component itself. So you are free to import _only_ the `Login.js` _if_ you take care of setting and injecting those properties into the component yourself. However if you choose to use the component from the higher order `Login.container.js` component, you need to integrate the Login components reducer into your application's reducers.

To add the reducer for the auth components into your application, just import the `reducer.js` from this library's `auth/` folder into your `combineReducers()` method. In a typical application you might have a `reducers.js` above your `components/` folder:

```javascript
import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

/* reducer for the `auth` component(s) from attainia-web-componets library */
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

Now, your `Login.container.js` will have access to the `auth` section of your application's Redux store, which is where the functionality specific to these components take place.

### Importing JS Components

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

### Importing non-Transpiled JavaScript Components

In case you wish to import the pre-transpiled components, you can change your import path (for _any_ component) to pull from the `src/` folder rather than the `/` root directory of the project.


```javascript
import Login from 'attainia-web-components/src/auth/Login';
```

### Importing Root CSS Styles

This repository leverages some shared, Attainia-branded styles in its components, however you can import them directly. Although you will need to handle the PostCSS/CSSNext compilation yourself, you can look at this project's `postcss.config.js` and/or copy that file directly into your own project's webpack build step(s) for PostCSS.

To import directly from this repository's modularized CSS you need to reference
the `src/css/` folder.

```css
@import "attainia-web-components/src/css/buttons.css";

.myCustomButton {
    @apply --btn;
}
```

## Component Table of Contents

Auth Components:

* [Login](#login)
* [PasswordHelp](#password-help)
* [Registration](#user-registration)
* [RegisterApplication](#app-registration)

Common Components:

* [Conditional](#conditional-rendering) 
* [FormField](#form-field) 
* [Logo](#attainia-logo)

### Login

Renders the Attainia user authentication component, which expects an email and password to be provided. Additionally it links to [password reset](#password-help) and [user registration](#user-registration) components.

### Password Help

Collects a given user's registered email address, to trigger the password reset process defined in your application.

### User Registration

New users can register with your application using this form. It currently provides name, email and password fields.

### App Registration

Allows administrative users to register an application with an OAuth provider back-end, which should return a client Id and client secret that the new application can use in future interaction with the OAuth provider.

### Conditional Rendering

Based on [mathieuancelin](https://github.com/mathieuancelin) npm module [react-conditional-render](https://www.npmjs.com/package/react-conditional-render), however its lack of attention and upkeep has caused some problems with linting and module bundling tools. Additionally, some functionality has been added here to allow its `condition` property to evaluate a greater range of "truthy" values.

In addition to the standard use:

```javascript
import {Conditional} from 'attainia-web-components/common/Conditional';

export default (props) =>
    <Conditional condition={props.isLoggedIn}>
        <header>
            <h1>{`Welcome ${props.name}!`}</h1>
        </header>
    </Conditional>;
```

You can import the `renderConditional` function for use outside of JSX (ie, in a higher order component wrapper):

```javascript
import {connect} from 'react-redux';
import {renderConditional} from 'attainia-web-components/common/Conditional';

import ResourcesDetail from './ResourcesDetail';

/* set the `condition` property and it will render the component when evaluates to true */
const mapStateToProps = state => ({
    condition: state.auth.user.id,
    resource: state.resources.detail
});

export default renderConditional(
    connect(mapStateToProps)(ResourcesDetail)
);
```

### Form Field

A wrapper around the `<input />` or `<textarea />` form fields, for use _specifically_ in [redux-forms](http://redux-form.com/). It supports numerous `type='<input type'`, but defaults to a value of `type='text'`. Additionally, it supports `placeholder` and `label`, the latter of which will render a `<label />` element before the actual `<input />` tag (except in the case of `<input type=checkbox />`, where the label renders after). Make sure to set your `id` property if you _are_ setting a `label` property, since the label must refer to the associated `<input />` element by its unique id.

### Attainia Logo

The current Attainia branded logo, in component form.
