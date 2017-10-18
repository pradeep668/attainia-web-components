import {pickBy} from 'ramda'
import {isNotNil} from 'ramda-adjunct'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {colors} from './constants'
import icons from './icons.json'

const Svg = styled.svg`display: block;`

const SimpleSvgIcon = props => {
    const {icon, width, height, viewBox, fill, ...svgProps} = props
    const {paths, transform, ...iconProps} = icons[icon]

    return (
        <Svg
            width={width || iconProps.width}
            height={height || iconProps.height}
            viewBox={viewBox || iconProps.viewBox || "0"}
            {...svgProps}
        >
            <g
                {...pickBy(isNotNil, {
                    transform,
                    fill: props.fill || iconProps.fill
                })}
            >
                {(paths || []).map(d => <path d={d} />)}
            </g>
        </Svg>
    )
}

SimpleSvgIcon.propTypes = {
    fill: PropTypes.string,
    viewBox: PropTypes.string,
    icon: PropTypes.string.isRequired,
    height: PropTypes.number,
    width: PropTypes.number
}

SimpleSvgIcon.defaultProps = {
    icon: '',
    fill: colors.rossoCorsa
}

export default SimpleSvgIcon
