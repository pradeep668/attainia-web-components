/* Not sure when eslint-plugin-react will fix their issue https://github.com/yannickcr/eslint/eslint-plugin-react/issues/1187 */
/* eslint "react/jsx-indent-props": "off" */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Link} from 'react-router-dom'
import Form from '../common/Form'
import Button from '../common/Button'
import LinkButton from '../common/LinkButton'
import {Conditional} from '../common/Conditional'
import {getThemeProp} from '../common/helpers'

const StyledForm = styled(Form)`
    & > * {
        margin: ${getThemeProp(['forms', 'formItemMargin'], '5px')};
    }

    & .detailName {
        text-align: center;
        vertical-align: middle;
        background: ${getThemeProp(['color', 'grayscale', 'white'], 'white')};
        font-size: 28px;
        font-weight: 100;
        border-radius: 10px;
        padding: 40px 0 20px 0;
        box-shadow: 2px 2px 4px ${getThemeProp(['colors', 'grayscale'], 'lightgray')};
    }

    & .detailHeader {
        text-align: center;
    }

    @supports not (display: grid) {
        .detailHeader,
        .detailName,
        .detailButtonDelete,
        .detailButtonCancel {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 768px)')} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 'header header' 'name name' 'delete cancel';

            .detailHeader {
                grid-area: header;
            }

            .detailName {
                grid-area: name;
            }

            .detailButtonDelete {
                grid-area: delete;
            }

            .detailButtonCancel {
                grid-area: cancel;
            }
        }
    }
`
class ResourcesDetail extends Component {
    componentWillMount() {
        this.props.getResource(this.props.id)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id) {
            this.props.getResource(nextProps.id)
        }
    }

    render() {
        const {resource, deleteResource} = this.props

        return (
            <Conditional condition={resource}>
                <StyledForm>
                    <h2 className="detailHeader">Delete Resource?</h2>
                    <p className="detailName">{resource.name}</p>
                    <Button className="detailButtonDelete" onClick={() => deleteResource(resource.id)}>
                        Yes
                    </Button>
                    <LinkButton className="detailButtonCancel">
                        <Link to="/resources">Cancel</Link>
                    </LinkButton>
                </StyledForm>
            </Conditional>
        )
    }
}

ResourcesDetail.propTypes = {
    deleteResource: PropTypes.func.isRequired,
    getResource: PropTypes.func.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    resource: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string
    })
}

export default ResourcesDetail
