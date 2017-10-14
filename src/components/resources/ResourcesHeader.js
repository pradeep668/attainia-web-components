import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import LinkButton from '../common/LinkButton'
import ExportButton from '../common/ExportButton'
import PrintButton from '../common/PrintButton'
import {colors} from '../common/constants'

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
    background: ${colors.isabellineGray};

    @supports not (display: grid) {
        .btnCreateResource,
        .btnPrint,
        .btnExport,
        .resourceCount,
        .title
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
                color: ${colors.spanishGray}
            }
        }
    }
`

const ResourcesHeader = ({className, resourceName, resourceCount}) =>
    <ListHeader>
        <Li>
            <div className="titleAndResourceCount">
                <h1 className="title">{resourceName}</h1>
                <h2 className="resourceCount">( {resourceCount} )</h2>
            </div>
        </Li>
        <Li>
            <ExportButton className="btnExport" /> 
        </Li>
        <Li>
            <PrintButton className="btnPrint" />
        </Li>
   		<Li>
			<LinkButton className="btnCreateResource">
    			<Link to="/resources/new">Add a Resource</Link>
    		</LinkButton>
        </Li>
    </ListHeader>


ResourcesHeader.propTypes = {
    className: PropTypes.string.isRequired,
    resourceName: PropTypes.string.isRequired,
    resourceCount: PropTypes.number.isRequired
}

export default ResourcesHeader
