import {path} from 'ramda'

export const getProp = (propsPath = [], defaultValue = '') =>
    props => path(propsPath, props) || defaultValue

export const getThemeProp = (propsPath = [], defaultValue = '') =>
    props => path(['theme'].concat(propsPath), props) || defaultValue
