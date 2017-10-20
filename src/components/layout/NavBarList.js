import uuid from 'uuid/v4'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {getThemeProp} from '../common/helpers'

const Li = styled.li` 
    transition: background 0.1s ease;
    cursor: pointer;
    color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
    list-style: none;
    font-size: 16px;
    line-height: 19px;
    padding-top: 10px;
    padding-bottom: 7px;
    background: ${props => props.isSelected && getThemeProp(['colors', 'secondary', 'default'], 'royalblue')(props)};
    border-left-width: 5px;
    border-color: transparent;
    border-left-style: solid;

    &:hover {
        border-color: ${getThemeProp(['colors', 'secondary', 'dk'], 'darkblue')};
        background: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')};
    }
    & a {
        padding: 10px 15px;
        color: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};
        text-decoration: none;
    }
`
const Ul = styled.ul`
    background-color: ${getThemeProp(['colors', 'grayscale', 'dk'], 'darkgray')};
    padding: 0;
    margin: 0;
    width: 200px;
    box-sizing: border-box;
`

const NavBarList = ({items}) => (
    <Ul>
        {items.map(({imgSrc, uri, label}) =>
            <Li key={uuid()} role="presentation">
                <a href={uri}>
                    {imgSrc && <img alt="left" src={imgSrc} />}
                    <span>{label}</span>
                </a>
            </Li>
        )}
    </Ul>
)

NavBarList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        imgSrc: PropTypes.string,
        uri: PropTypes.string
    }))
}

NavBarList.defaultProps = {
    items: []
}

export default NavBarList
