import styled from 'styled-components'
import {getThemeProp} from './helpers'

export default styled.div`
    color: white;
    background-color: ${getThemeProp(['colors', 'status', 'error'], 'crimson')};
    font-size: 10px;
    padding: 7px;
    text-align: center;
`
