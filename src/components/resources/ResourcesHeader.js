import React from 'react'
import PropTypes from 'prop-types'
import styled, {withTheme} from 'styled-components'
import {Link} from 'react-router-dom'
import LinkButton from '../common/LinkButton'
import SimpleSvgIcon from '../common/SimpleSvgIcon'
import {getThemeProp} from '../common/helpers'

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
        .btnCreateResource,
        .btnPrint,
        .btnExport,
        .resourceCount,
        .title {
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
                color: ${getThemeProp(['colors', 'grayscale', 'md'], 'mediumgray')}
            }
        }
    }
`

const ResourcesHeader = (props) => {
    const {className, resourceName, resourceCount} = props

    return (
        <ListHeader className={className}>
            <Li>
                <div className="titleAndResourceCount">
                    <h1 className="title">{resourceName}</h1>
                    <h2 className="resourceCount">
                        {resourceCount ? `( ${resourceCount} )` : ''}
                    </h2>
                </div>
            </Li>
            <Li>
                <SimpleSvgIcon
                    icon="document"
                    className="btnExport"
                    fill={getThemeProp(['colors', 'secondary', 'default'])(props)}
                />
            </Li>
            <Li>
                <SimpleSvgIcon
                    icon="print"
                    className="btnPrint"
                    fill={getThemeProp(['colors', 'secondary', 'default'])(props)}
                />
            </Li>
            <Li>
                <LinkButton className="btnCreateResource" style={{padding: '12px 0'}}>
                    <Link to="/resources/new">Add a Resource</Link>
                </LinkButton>
            </Li>
        </ListHeader>
    )
}


ResourcesHeader.propTypes = {
    className: PropTypes.string,
    resourceName: PropTypes.string.isRequired,
    resourceCount: PropTypes.number.isRequired
}

ResourcesHeader.defaultProps = {
    resourceCount: 0
}

export default withTheme(ResourcesHeader)
