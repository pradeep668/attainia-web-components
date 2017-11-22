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
import ErrorMessage from '../../src/components/common/ErrorMessage'

const CenterDiv = styled.div`
    margin-left: auto;
    margin-right: auto;
`
const Spaced = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`
const fontLabel = 'Font Size';
const fontDefault = '12px';

storiesOf('Error Message', module)
.addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
        <CenterDiv>
            <StoryComponent />
        </CenterDiv>
    </ThemeProvider>
    ))
.addDecorator(withKnobs)

.add('Error Message',
    compose(
    withInfo('A styled error message that can be displayed on screen.'),
    withNotes('A styled error message that can be displayed on screen.')
    )(() =>
        <div>
            <ErrorMessage styles={{fontSize: text(fontLabel, fontDefault)}}>
            {text('Message', 'This is a sample error message indicating an error.')}
            </ErrorMessage>
        </div>
    ));

 