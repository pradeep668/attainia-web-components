import styled from 'styled-components'
import {colors, forms} from './constants'

export default styled.form`
    background: ${colors.isabellineGray};
    min-width: ${forms.smallFormWidth};
    max-width: ${forms.smallFormWidth};
    margin: 0 auto;
    border-radius: 4px;
    box-sizing: border-box;
    box-shadow: 2px 2px 3px ${colors.pastelGray};
    padding-bottom: 10px;
`
