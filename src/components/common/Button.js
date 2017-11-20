import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getThemeProp, getProp} from './helpers'

const Button = styled.button`
    background-color: ${
        props => getThemeProp(['colors', 'status', props.status])(props) ||
        props.styles.backgroundColor ||
        getThemeProp(['colors', 'primary', 'default'], 'crimson')(props)
    };
    color: ${
        props => props.styles.color ||
        getThemeProp(['colors', 'grayscale', 'white'], 'white')(props)
    };
    ${props => props.disabled && 'background-color: grey;'}
    cursor: pointer;
    border: none;
    border-radius: 5px;
    font-family: ${getThemeProp(['fonts', 'fontFamily'], 'Arial')};
    font-size: ${
        props => props.styles.fontSize || '15px'
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
    status: PropTypes.oneOf(['error', 'warning', 'ok', 'none'])
}

Button.defaultProps = {
    styles: {}
}

export default Button