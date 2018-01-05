import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withKnobs, text, boolean, number, array, select, color, object} from '@storybook/addon-knobs'
import {withNotes} from '@storybook/addon-notes'
import {action} from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'
import {ThemeProvider} from 'styled-components'
import styled from 'styled-components'

import theme from '../../src/theme'
import ButtonLink from '../../src/components/common/ButtonLink'
import Button from '../../src/components/common/Button'
import LinkButton from '../../src/components/common/LinkButton'


const CenterDiv = styled.div`
    margin-left: auto;
    margin-right: auto;
`

const fontLabel = 'Font Size';
const fontDefault = '12px';



storiesOf('Button Links', module)
.addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
        <CenterDiv>
            <StoryComponent />
        </CenterDiv>
    </ThemeProvider>
    ))
.addDecorator(withKnobs)

.add('Button Links',
    compose(
    withInfo('A basic button link, royal blue, underlined with the basic link following rules.'),
    withNotes('A basic button link.  Use the knobs to change the label or the font size to see different variations.')
        )(() => ([
        <div>
            <ButtonLink onClick={action('Link clicked!')} styles={{fontSize: text(fontLabel, fontDefault)}} >           
            {text('Label', 'Button Link Example')}
            </ButtonLink>
        </div>])))

.add('Link Buttons',
    compose(
    withInfo('A basic link, royal blue, underlined with the basic link following rules.'),
    withNotes('A basic link button.  Use the knobs to change the label or the font size to see different variations.')
        )(() => ([
        <div>
            <LinkButton onClick={action('Link clicked!')} styles={{fontSize: text(fontLabel, fontDefault)}} >           
            {text('Label', 'Link Button Example')}
            </LinkButton>
        </div>])))