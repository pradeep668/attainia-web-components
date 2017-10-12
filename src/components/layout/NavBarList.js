import uuid from 'uuid/v4'
import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {colors} from '../common/constants'

const Li = styled.li` 
    transition: background 0.1s ease;
    cursor: pointer;
    color: white;
    list-style: none;
    font-size: 16px;
    line-height: 19px;
    padding-top: 10px;
    padding-bottom: 7px;
    background: ${props => props.isSelected && colors.cornflowerBlue};
    border-left-width: 5px;
    border-color: transparent;
    border-left-style: solid;

    &:hover {
        border-color: ${colors.lapisLazuli};
        background: ${colors.jet};
    }
    & a {
        padding: 10px 15px;
        color: white;
        text-decoration: none;
    }
`
const Ul = styled.ul`
    background-color: ${colors.outerSpace};
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
