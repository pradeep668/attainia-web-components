import styled from 'styled-components'
import {colors} from './constants'

export default styled.a`
    color: ${colors.blue};
    text-decoration: underline;
    font-size: 12px;
    &:focus {
        outline: none;
    }
`
