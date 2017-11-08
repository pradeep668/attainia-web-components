import PropTypes from 'prop-types'
import styled from 'styled-components'

const HeaderImage = styled.div`
    position: relative;
    background: transparent;
    width: 100%;
    min-height: ${props => props.height || '110px'};

    &::after {
        content: "";
        ${props => props.backgroundImage && `background: url(${props.backgroundImage}) no-repeat;`}
        background-size: 100%;
        max-height: ${props => props.height || '110px'};
        opacity: ${props => props.opacity || '0.3'};
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        position: absolute;
        z-index: -1;   
    }

    @supports not (display: grid) {
        display: flex;
    }

    @supports (display: grid) {
        display: grid;
    }

    justify-content: center;
    align-items: center;
`

HeaderImage.propTypes = {
    backgroundImage: PropTypes.string,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    opacity: PropTypes.number
}

export default HeaderImage
