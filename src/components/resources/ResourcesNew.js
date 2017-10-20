import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Link} from 'react-router-dom'
import Form from '../common/Form'
import Button from '../common/Button'
import LinkButton from '../common/LinkButton'
import ReduxFormField from '../common/ReduxFormField'
import {getThemeProp} from '../common/helpers'

const StyledForm = styled(Form)`
    & > * {
        margin: ${getThemeProp(['forms', 'formItemMargin'], '5px')};
    }

    & .newResourceHeader {
        text-align: center;
    }

    @supports not (display: grid) {
        .newResourceHeader,
        .newResourceButtonCancel,
        .newResourceButtonSave,
        .newResourceName {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 768px)')} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 'header header' 'name name' 'save cancel';

            .newResourceHeader {
                grid-area: header;
            }
            .newResourceButtonCancel {
                grid-area: cancel;
            }
            .newResourceButtonSave {
                grid-area: save;
            }
            .newResourceName {
                grid-area: name;
            }
        }
    }
`
const ResourcesNew = ({handleSubmit, createResource}) =>
    <StyledForm onSubmit={handleSubmit(createResource)}>
        <h3 className="newResourceHeader">Add a new resource</h3>
        <ReduxFormField className="newResourceName" placeholder="Name" name="name" />
        <Button className="newResourceButtonSave" type="submit">
            Save
        </Button>
        <LinkButton className="newResourceButtonCancel">
            <Link to="/">Cancel</Link>
        </LinkButton>
    </StyledForm>

ResourcesNew.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    createResource: PropTypes.func.isRequired
}

export default ResourcesNew
