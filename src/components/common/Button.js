import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getThemeProp, getProp} from './helpers'

const Button = styled.button`
    background-color: ${props =>
        getThemeProp(['colors', 'status', props.status])(props) ||
        getProp(['styles', 'backgroundColor'])(props) ||
        getThemeProp(['colors', 'primary', 'default'], 'crimson')(props)
};
    color: ${props => getProp(['styles', 'color'])(props) ||
        getThemeProp(['colors', 'grayscale', 'white'], 'white')(props)
};
    ${props => props.disabled && 'background-color: grey;'}
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-family: ${getThemeProp(['fonts', 'fontFamily'], 'Arial')};
    font-size: ${props =>
        getThemeProp(['fonts', 'fontSize'])(props) ||
        getProp(['styles', 'fontSize'], '15px')(props)
};
    font-weight: 700;
    padding: ${getProp(['styles', 'padding'], '18px 0')};
    text-align: center;
    text-decoration: none;
    &:focus {
        outline: none;
    }
`
Button.propTypes = {
    disabled: PropTypes.bool,
    styles: PropTypes.shape({
        fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        color: PropTypes.string,
        backgroundColor: PropTypes.string,
        padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    }),
    status: PropTypes.oneOf(['error', 'warning', 'ok', '']).isRequired
}

Button.defaultProps = {
    status: '',
    styles: {}
}

export default Button
