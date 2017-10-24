import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.button`
    color: ${getThemeProp(['colors', 'secondary', 'dk'], 'royalblue')};
    text-decoration: underline;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    font-size: ${getThemeProp(['fonts', 'fontSize'], '12px')};
    &:focus {
        outline: none;
    }
`
