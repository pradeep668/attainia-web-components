import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import Button from '../common/Button'
import Form from '../common/Form'
import SimpleSvgIcon from '../common/SimpleSvgIcon'
import ReduxFormField from '../common/ReduxFormField'
import {breakpoints, forms} from '../common/constants'

const StyledForm = styled(Form)`
    & > * {
        margin: ${forms.formItemMargin};
    }

    & .attainiaLogo {
        margin: 30px auto 15px auto;
    }

    & .instructions {
        text-align: center;
    }

    @supports not (display: grid) {
        .registrationButton,
        .attainiaLogo,
        .instructions,
        .name,
        .password,
        .email,
        .cancelButton {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${breakpoints.desktop} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 'header header' 'instructions instructions' 'name name' 'email email'
                'password password' 'save cancel';

            & .attainiaLogo {
                grid-area: header;
            }

            & .instructions {
                grid-area: instructions;
            }

            & .name {
                grid-area: name;
            }

            & .password {
                grid-area: password;
            }

            & .email {
                grid-area: email;
            }

            & .registrationButton {
                grid-area: save;
            }

            & .cancelButton {
                grid-area: cancel;
            }
        }
    }
`
const Registration = ({handleSubmit, tryRegister, cancel}) =>
    <StyledForm onSubmit={handleSubmit(tryRegister)}>
        <SimpleSvgIcon className="attainiaLogo" width="161" height="39" icon="attainia_logo" />
        <p className="instructions">Register Your Account</p>
        <ReduxFormField className="name" placeholder="name" name="name" />
        <ReduxFormField className="email" placeholder="email" name="email" type="email" />
        <ReduxFormField className="password" placeholder="password" type="password" name="password" />
        <Button className="registrationButton" type="submit">
            Register
        </Button>
        <Button className="cancelButton" type="button" onClick={cancel}>
            Cancel
        </Button>
    </StyledForm>

Registration.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    cancel: PropTypes.func.isRequired,
    tryRegister: PropTypes.func.isRequired
}

export default Registration
