import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.a`
    color: ${getThemeProp(['colors', 'secondary', 'dk'], 'royalblue')};
    text-decoration: underline;
    font-size: 12px;
    &:focus {
        outline: none;
    }
`
