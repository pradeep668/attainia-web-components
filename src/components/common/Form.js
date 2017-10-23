import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.form`
    background: ${getThemeProp(['colors', 'grayscale', 'white'], 'lightgray')};
    min-width: ${getThemeProp(['forms', 'smallFormWidth'], '300px')};
    max-width: ${getThemeProp(['forms', 'smallFormWidth'], '300px')};
    margin: 0 auto;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 2px 2px 3px ${getThemeProp(['colors', 'grayscale', 'lt'], 'lightgray')};
    padding-bottom: 10px;
`
