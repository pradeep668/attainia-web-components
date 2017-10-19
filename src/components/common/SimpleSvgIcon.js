import {pickBy} from 'ramda'
import {isNotEmpty, isNotNil} from 'ramda-adjunct'
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import uuid from 'uuid/v4'
import {colors} from './constants'
import {Conditional} from './Conditional'
import icons from './icons.json'

const Svg = styled.svg`display: block;`

const SimpleSvgIcon = props => {
    const {icon, width, height, viewBox, fill, ...svgProps} = props
    const {paths, transform, ...iconProps} = icons[icon] || {paths: []}

    return (
        <Conditional condition={isNotNil(paths) && isNotEmpty(paths)}>
            <Svg
                width={width || iconProps.width}
                height={height || iconProps.height}
                {...pickBy(isNotNil, {
                    viewBox: viewBox || iconProps.viewBox
                })}
                {...svgProps}
            >
                <g
                    {...pickBy(isNotNil, {
                        transform,
                        fill: props.fill || iconProps.fill
                    })}
                >
                    {paths.map(d => <path key={uuid()} d={d} />)}
                </g>
            </Svg>
        </Conditional>
    )
}

SimpleSvgIcon.propTypes = {
    fill: PropTypes.string,
    viewBox: PropTypes.string,
    icon: PropTypes.string.isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

SimpleSvgIcon.defaultProps = {
    icon: '',
    fill: colors.rossoCorsa
}

export default SimpleSvgIcon
