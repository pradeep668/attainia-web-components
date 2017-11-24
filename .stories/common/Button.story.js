import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, boolean, select} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import styled, {ThemeProvider} from 'styled-components'

import theme from '@theme'
import Button from '@awc/common/Button'
import ContentCentered from '@awc/layout/ContentCentered'

const Spaced = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

storiesOf('Buttons', module)
.addDecorator(withKnobs)
.addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
        <ContentCentered>
            <StoryComponent />
        </ContentCentered>
    </ThemeProvider>
))
.add('Attainia Buttons',
    compose(
    withInfo('The basic Attainia buttons with primary and secondary colors.'),
    withNotes('These are the basic Attainia buttons with both primary and secondary colors.')
    )(() => ([
        <Spaced>
            <Button styles={{backgroundColor: '#E10600'}}>
                Primary Default
            </Button>

            <Button styles={{backgroundColor: '#F0887D'}}>
                Primary Light
            </Button>

            <Button styles={{backgroundColor: '#E10600'}}>
                Primary Medium
            </Button>

            <Button styles={{backgroundColor: '#FF0700'}}>
                Primary Dark
            </Button>
        </Spaced>,
        <br />,
        <br />,
        <Spaced>
            <Button styles={{backgroundColor: '#1b6595'}}>
                Secondary Default
            </Button>
            <Button styles={{backgroundColor: '#227fbb'}}>
                Secondary Light
            </Button>
            <Button styles={{backgroundColor: '#1b6595'}}>
                Secondary Medium
            </Button>
            <Button styles={{backgroundColor: '#1F74B2'}}>
                Secondary Dark
            </Button>
        </Spaced>
    ]))
)
.add('Button Playground',
    compose(
    withInfo('This is the basic button with some knobs playground stuff.'),
    withNotes('This is a basic Attainia button with some knobs to provide user feedback.')
    )(() =>
        <div>
            <Button
                onClick={action('Button clicked')}
                disabled={boolean('Disabled', false)}
                status={select('Button Style', ['none', 'warning', 'ok', 'error'])}
                styles={{padding: '18px 5px'}}
            >
                {text('Label', 'Attainia Button')}
            </Button>
        </div>
    )
)
