import uuid from 'uuid/v4'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Link} from 'react-router-dom'
import Form from '../common/Form'
import LinkButton from '../common/LinkButton'
import {breakpoints, forms, colors} from '../common/constants'

const StyledForm = styled(Form)`
    & > * {
        margin: ${forms.formItemMargin};
    }

    & .resourcesHeader {
        text-align: center;
    }

    & .listGroup {
        padding: 0;

        & .listGroupItem {
            background: white;
            padding: 3px;
            text-align: left;
            list-style: none;
            box-sizing: border-box;
            margin: 1px 0;
            width: 100%;

            & a {
                display: block;
                width: 100%;
                color: ${colors.jet};
                text-decoration: none;
            }
            &:hover,
            &:focus {
                transition: background 0.2s ease;
                background-color: ${colors.lightCoral};
            }
        }
    }

    @supports not (display: grid) {
        .resourcesHeader,
        .listGroup,
        .resourcesButtonAdd {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${breakpoints.tablet} {
            display: grid;
            grid-template-columns: 1fr;
            grid-template-areas: 'header' 'list' 'add';

            .listGroup {
                display: grid;
            }

            .resourcesHeader {
                grid-area: header;
            }

            .listGroup {
                grid-area: list;
            }

            .resourcesButtonAdd {
                grid-area: add;
            }
        }
    }
`
class ResourcesList extends Component {
    componentWillMount() {
        this.props.findAllResources()
    }

    render() {
        const {resources} = this.props

        return (
            <StyledForm>
                <h2 className="resourcesHeader">Resources</h2>
                <ul className="listGroup">
                    {resources.map(({id, name}) => (
                        <li className="listGroupItem" key={uuid()}>
                            <Link key={uuid()} to={`/resources/${id}`}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <LinkButton className="resourcesButtonAdd">
                    <Link to="/resources/new">Add a Resource</Link>
                </LinkButton>
            </StyledForm>
        )
    }
}

ResourcesList.propTypes = {
    findAllResources: PropTypes.func.isRequired,
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    )
}

ResourcesList.defaultProps = {
    resources: []
}

export default ResourcesList
