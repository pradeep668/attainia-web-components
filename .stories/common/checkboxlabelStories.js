import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, boolean, number, array, select, color, object} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes';
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components'

import theme from '../../src/theme'
import CheckboxLabel from '../../src/components/common/CheckboxLabel'
import FormField from '../../src/components/common/FormField'

const CenterDiv = styled.div`
    margin-left: auto;
    margin-right: auto;
`
const Spaced = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

storiesOf('Checkbox & Label', module)
.addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
        <CenterDiv>
            <StoryComponent />
        </CenterDiv>
    </ThemeProvider>
    ))

.add('Checkbox & Label',
    compose(
    withInfo('A styled checkbox that is wrapped and the *onClick* is attached to the wrapper (value is still bound to the underlying *<input type=checkbox />*) to facilitate the checkbox behavior.'),
    withNotes('This is a checkbox that has a checkbox label on it.')
    )(() =>
        <div>
            <FormField
                className="Checkbox Label"
                label='Checkbox Label'
                type="checkbox"
                name="rememberMe"
                checked='False'
            />
        </div>
    ));

 