import styled from 'styled-components'
import Button from './Button'
import {colors} from './constants'

const spinner = `
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
    border: 2px solid ${colors.pastelGray};
    border-top-color: ${colors.rossoCorsa};
    animation: spinner .6s linear infinite;
`
export default styled(Button)`
    position: relative;
    ${props => props.inProgress && 'opacity: 0.9;'}
    ${props => props.inProgress && `background: ${colors.jet};`}
    ${props => props.inProgress && `color: ${colors.jet};`}

    @keyframes spinner {
        to {transform: rotate(360deg);}
    }
     
    &:before {
        ${props => props.inProgress && spinner}
    }
`
