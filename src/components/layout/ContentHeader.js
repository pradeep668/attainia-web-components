import pluralize from 'pluralize'
import {compose, toUpper, toLower} from 'ramda'
import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {Link} from 'react-router-dom'
import LinkButton from '../common/LinkButton'
import SimpleSvgIcon from '../common/SimpleSvgIcon'
import {getThemeProp} from '../common/helpers'

const capitalize = str => str.replace(/(?:^|\s)\S/g, toUpper)
const formatButtonText = compose(str => `Add a ${str}`, capitalize, toLower)
const formatResourceName = compose(pluralize, capitalize, toLower)
const formatRoutePath = compose(pluralize, toLower)

const Li = styled.div`
    text-align: left;
    @supports not (display: grid) {
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        align-content: center;
    }
`
const ListHeader = styled.ul`
    box-shadow: 0 2px 5px 0 rgba(0,0,0,.2);
    list-style: none;
    margin: 0;
    padding: 12px;
    background: ${getThemeProp(['colors', 'grayscale', 'white'], 'white')};

    @supports not (display: grid) {
        & > * {
            margin: 0 auto;
            max-width: 50em;
        }
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr repeat(2, 50px) 140px;
        grid-template-rows: 50px;
        grid-column-gap: 3px;

        .titleAndResourceCount {
            display: inline-grid;
            grid-template-columns: minmax(auto, 6%) 1fr;
            align-items: center;
            .title {
                padding-right: 10px; 
            }
            .resourceCount {
                color: ${getThemeProp(['colors', 'grayscale', 'lt'], 'mediumgray')}
            }
        }
    }
`

const ContentHeader = ({className, resourceType, resourceCount, ...additionalProps}) =>
    <ListHeader className={className}>
        <Li className="titleAndResourceCount">
            <h1 className="title">{formatResourceName(resourceType)}</h1>
            <h2 className="resourceCount">{resourceCount ? `( ${resourceCount} )` : ''}</h2>
        </Li>
        <Li>
            <SimpleSvgIcon icon="document" fill={getThemeProp(['colors', 'secondary', 'default'])(additionalProps)} />
        </Li>
        <Li>
            <SimpleSvgIcon icon="print" fill={getThemeProp(['colors', 'secondary', 'default'])(additionalProps)} />
        </Li>
        <Li>
            <LinkButton style={{padding: '12px 0'}}>
                <Link to={`/${formatRoutePath(resourceType)}/new`}>{formatButtonText(resourceType)}</Link>
            </LinkButton>
        </Li>
    </ListHeader>

ContentHeader.propTypes = {
    className: PropTypes.string,
    resourceCount: PropTypes.number.isRequired,
    resourceType: PropTypes.string.isRequired
}

ContentHeader.defaultProps = {
    resourceCount: 0,
    resourceType: 'Resource'
}

export default withTheme(ContentHeader)
