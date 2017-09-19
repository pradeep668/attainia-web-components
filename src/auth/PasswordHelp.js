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
        .attainiaLogo, .passwordHelpButton, .email, .cancelButton {
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
              "email email"
              "submit cancel";

            & .attainiaLogo {
                grid-area: header;
            }

            & .email {
                grid-area: email;
            }

            & .passwordHelpButton {
                grid-area: submit;
            }

            & .cancelButton {
                grid-area: cancel;
            }
        }
    }
`
const PasswordHelp = ({handleSubmit, tryPasswordHelp, email, cancel}) =>
    <StyledForm className='passwordHelpForm' onSubmit={handleSubmit(tryPasswordHelp)}>
        <Logo className='attainiaLogo' />
        <ReduxFormField className='email' placeholder='email' name='email' type='email' value={email} />
        <Button className='passwordHelpButton' type='submit'>Reset Password</Button>
        <Button className='cancelButton' type='button' onClick={cancel}>Cancel</Button>
    </StyledForm>

PasswordHelp.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    tryPasswordHelp: PropTypes.func.isRequired,
    email: PropTypes.string
}

export default PasswordHelp
