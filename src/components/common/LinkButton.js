import styled from 'styled-components'
import Button from './Button'
import {getThemeProp} from './helpers'

export default styled(Button)`
    & > a {
        text-decoration: none;
        color: ${getThemeProp(['grayscale', 'white'], 'white')};
    }
`
