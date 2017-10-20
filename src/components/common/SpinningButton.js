import styled from 'styled-components'
import Button from './Button'
import {getThemeProp} from './helpers'

export default styled(Button)`
    position: relative;
    ${props => props.inProgress && 'opacity: 0.9;'}
    ${props => props.inProgress && `background: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')(props)};`}
    ${props => props.inProgress && `color: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')(props)};`}

    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
     
    &:before {
        ${props => props.inProgress && `
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            width: 32px;
            height: 32px;
            margin-top: -16px;
            margin-left: -16px;
            border-radius: 50%;
            border: 2px solid ${getThemeProp(['colors', 'grayscale', 'lt'], 'lightgray')(props)};
            border-top-color: ${getThemeProp(['colors', 'primary', 'default'], 'crimson')(props)};
            animation: spinner .6s linear infinite;
        `}
    }
`
