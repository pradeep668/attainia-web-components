import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.a`
    color: ${getThemeProp(['colors', 'secondary', 'dk'], 'royalblue')};
    text-decoration: underline;
    font-size: ${getThemeProp(['fonts', 'fontSize'], '12px')};
    &:focus {
        outline: none;
    }
`
