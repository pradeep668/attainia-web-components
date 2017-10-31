import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import {Link} from 'react-router-dom'
import {Button, LinkButton, Form, SimpleSvgIcon, ReduxFormField} from '../common'
import {getThemeProp} from '../common/helpers'

const StyledForm = styled(Form)`
    & > * {
        margin: ${getThemeProp(['forms', 'formItemMargin'], '5px')};
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
        @media ${getThemeProp(['breakpoints', 'tablet'], 'screen and (min-width: 768px)')} {
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
const Registration = ({handleSubmit, tryRegister}) =>
    <StyledForm onSubmit={handleSubmit(tryRegister)}>
        <SimpleSvgIcon className="attainiaLogo" width="161" height="39" icon="primary" />
        <p className="instructions">Register Your Account</p>
        <ReduxFormField className="name" placeholder="name" name="name" />
        <ReduxFormField className="email" placeholder="email" name="email" type="email" />
        <ReduxFormField className="password" placeholder="password" type="password" name="password" />
        <Button className="registrationButton" type="submit">Register</Button>
        <LinkButton className="cancelButton"><Link to="/">Cancel</Link></LinkButton>
    </StyledForm>

Registration.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    tryRegister: PropTypes.func.isRequired
}

export default Registration
