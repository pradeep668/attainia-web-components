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
    padding: 0;
    background: ${colors.isabellineGray};

    .title {
        padding-left: 50px;
        .h1 {
            color: ${colors.spanishGray}
        }
    }

    .btnCreateResource {
    }

    @supports not (display: grid) {
        .btnCreateResource,
        .btnPrint,
        .btnExport,
        .resourceCount,
        .title
    }

    @supports (display: grid) {
        display: grid;
        grid-template-columns: 1fr repeat(3, 50px) 130px;
        grid-template-rows: 50px;
        grid-column-gap: 3px;
    }
`

const ResourcesHeader = ({className, resourceName, resourceCount}) =>
    <ListHeader>
        <Li>
            <div className="title">
                <h1>{resourceName}</h1>
            </div>
        </Li>
        <Li>
            <div className="resourceCount">
                <h2>( {resourceCount} )</h2>
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
