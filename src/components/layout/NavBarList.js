import uuid from 'uuid/v4'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {SimpleSvgIcon} from '../common'
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
        border-color: ${getThemeProp(['colors', 'secondary', 'default'], 'royalblue')};
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
        {items.map(({iconName, link, label}) =>
            <Li
                isSelected={link === window.location.pathname}
                key={uuid()}
                role="presentation"
            >
                <Link to={link}>
                    {iconName && <SimpleSvgIcon icon={iconName} />}
                    <span>{label}</span>
                </Link>
            </Li>
        )}
    </Ul>
)

NavBarList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        iconName: PropTypes.string,
        label: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
    }))
}

NavBarList.defaultProps = {
    items: []
}

export default NavBarList
