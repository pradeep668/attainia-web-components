import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.div`
    background: ${getThemeProp(['colors', 'grayscale', 'black'], 'black')};
    color: ${getThemeProp(['colors', 'primary', 'md'], 'red')};
    font-size: ${getThemeProp(['fonts', 'fontSize'], '12px')};
    font-family: ${getThemeProp(['fonts', 'fontFamily'], 'Arial')};
    text-align: center;
`
