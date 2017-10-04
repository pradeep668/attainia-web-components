import styled from 'styled-components'
import {colors, fonts} from './constants'

export default styled.button`
    background-color: ${colors.rossoCorsa};
    color: white;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-family: ${fonts.fontFamily};
    font-size: 15px;
    font-weight: 700;
    padding: 18px 0;
    text-align: center;
    text-decoration: none;
    &:focus {
        outline: none;
    }
`
