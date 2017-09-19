import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../common/Button'
import Form from '../common/Form'
import Logo from '../common/Logo'
import ReduxFormField from '../common/ReduxFormField'
import {breakpoints, forms} from '../common/constants'

const StyledForm = styled(Form)`
    & > * {
        margin: ${forms.formItemMargin}
    }

    & .attainiaLogo {
        margin: 30px auto 15px auto;
    }

    @supports not (display: grid) {
        .registerApplicationButton,
        .redirect,
        .attainiaLogo,
        .instructions,
        .applicationName,
        .grantType,
        .cancelButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${breakpoints.desktop} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas:
              "header header"
              "instructions instructions"
              "name name"
              "grant grant"
              "redirect redirect"
              "save cancel";

            & .attainiaLogo {
                grid-area: header;
            }

            & .instructions {
                grid-area: instructions;
            }

            & .redirect {
                grid-area: redirect;
            }

            & .applicationName {
                grid-area: name;
            }

            & .grantType {
                grid-area: grant;
            }

            & .registerApplicationButton {
                grid-area: save;
            }

            & .cancelButton {
                grid-area: cancel;
            }
        }
    }
`
const RegisterApplication = ({handleSubmit, tryRegisterApp, cancel}) =>
    <StyledForm onSubmit={handleSubmit(tryRegisterApp)}>
        <Logo className='attainiaLogo' />
        <p className='instructions'>Register Your Application</p>
        <ReduxFormField className='applicationName' placeholder='name' name='name' />
        <ReduxFormField className='grantType' placeholder='grant type' name='grantType' />
        <ReduxFormField className='redirect' placeholder='redirects to' name='redirect' type='url' />
        <Button className='registerApplicationButton' type='submit'>Register</Button>
        <Button className='cancelButton' type='button' onClick={cancel}>Cancel</Button>
    </StyledForm>

RegisterApplication.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    tryRegisterApp: PropTypes.func.isRequired
}

export default RegisterApplication
