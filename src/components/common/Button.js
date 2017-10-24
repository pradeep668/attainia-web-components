import styled from 'styled-components'
import {getThemeProp, getProp} from './helpers'

export default styled.button`
    background-color: ${getThemeProp(['colors', 'primary', 'default'], 'crimson')};
    color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-family: ${getThemeProp(['fonts', 'fontFamily'], 'Arial')};
    font-size: 15px;
    font-weight: 700;
    padding: ${getProp(['style', 'padding'], '18px 0')};
    text-align: center;
    text-decoration: none;
    &:focus {
        outline: none;
    }
`
