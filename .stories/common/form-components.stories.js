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
import InputField from '../../src/components/common/InputField'

const CenterDiv = styled.div`
    margin-left: auto;
    margin-right: auto;
`
const Spaced = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

var sampleValues = ['Hospital Bed A', 'Hospital Bed B', 'Hospital Bed C', 'Hospital Bed D'];

storiesOf('Form Components', module)
.addDecorator(StoryComponent => (
    <ThemeProvider theme={theme}>
        <CenterDiv>
            <StoryComponent />
        </CenterDiv>
    </ThemeProvider>
    ))

.add('Checkbox with Label',
    compose(
    withInfo('A styled checkbox that is wrapped and the *onClick* is attached to the wrapper (value is still bound to the underlying *<input type=checkbox />*) to facilitate the checkbox behavior.'),
    withNotes('This is a checkbox that has a checkbox label on it.')
    )(() =>
        <div>
            <FormField
                className="Checkbox Label"
                label='Checkbox Label 1'
                type="checkbox"
                name="Checkbox 1"
                checked='0'
            />
            <FormField
                className="Checkbox Label"
                label='Checkbox Label 2'
                type="checkbox"
                name="Checkbox 2"
            />
        </div>
    ))

.add('Sample Text Form Fields',
    compose(
    withInfo('An input element type of text box.'),
    withNotes('An input element type of text box.')
    )(() =>
        <div>
            <FormField
                className="Form Field"
                label='Text Input Field'
                type="text"
                name="text"
            />
        <br></br>
        <br></br>
            <FormField
                className="Password Field"
                label='Password Input Field'
                type="password"
                name="password"
            />
        </div>
))

.add('Sample Radio Buttons',
    compose(
    withInfo('A radio button or option button is a graphical control element that allows the user to choose only one of a predefined set of mutually exclusive options.'),
    withNotes('Four radio buttons to show a layout consisting of four options in a small square grid.')
    )(() => ([
    <Spaced>
        <FormField
            className="Radio Field"
            label='Radio Button 1'
            type="radio"
            name="radio"
        />

        <FormField
            className="Radio Field"
            label='Radio Button 2'
            type="radio"
            name="radio"
        />
    </Spaced>,
        <br></br>,
        <br></br>,
    <Spaced>
        <FormField
            className="Radio Field"
            label='Radio Button 3'
            type="radio"
            name="radio"
        />

        <FormField
            className="Radio Field"
            label='Radio Button 4'
            type="radio"
            name="radio"
    />
    </Spaced>
])))

.add('Color Picker Field',
    compose(
    withInfo('A color picker field.'),
    withNotes('A color picker field.')
    )(() =>
    <div>
        <FormField
            className="Color Field"
            label='Color Picker Field'
            type="color"
            name="color"
        />
    </div>
))

.add('Email Field',
    compose(
    withInfo('Email field'),
    withNotes('Email field.')
    )(() =>
    <div>
        <FormField
            className="Email Field"
            label='Email Field'
            type="email"
            name="email"
        />
    </div>
))

.add('File Picker',
    compose(
    withInfo('File picker field'),
    withNotes('File picker field.')
    )(() =>
    <div>
        <FormField
            className="File Picker Field"
            label='File Picker Field'
            type="file"
            name="file"
        />
    </div>
))

.add('Date & DateTime Fields',
    compose(
    withInfo('Date picker field'),
    withNotes('Date picker field.')
    )(() =>
    <div>
        <FormField
            className="Date Picker Field"
            label='Date Picker Field'
            type="date"
            name="date"
            />
    <br></br>
    <br></br>
        <FormField
            className="DateTime Picker Field"
            label='DateTime Picker Field'
            type="datetime-local"
            name="datetime-local"
        />
    </div>
))

.add('Date: Month Picker',
    compose(
    withInfo('Date: Month Picker'),
    withNotes('Date: Month Picker')
    )(() =>
    <div>
        <FormField
            className="Month Picker"
            label='Month Picker'
            type="month"
            name="month"
        />
    </div>
))

.add('Date: Week Picker',
    compose(
    withInfo('Date: Week Picker'),
    withNotes('Date: Week Picker')
    )(() =>
    <div>
        <FormField
            className="Week Picker"
            label='Week Picker'
            type="week"
            name="week"
        />
    </div>
))

.add('Date: Time Picker',
    compose(
    withInfo('Date: Time Picker'),
    withNotes('Date: Time Picker')
    )(() =>
    <div>
        <FormField
            className="Time Picker"
            label='Time Picker'
            type="time"
            name="time"
        />
    </div>
))

.add('Number Field',
    compose(
    withInfo('Number field.'),
    withNotes('Number field.')
    )(() =>
    <div>
        <FormField
            className="Number field"
            label='Number Selector Field'
            type="number"
            name="number"
        />
    </div>
))

.add('Range Slider',
    compose(
    withInfo('Range slider.'),
    withNotes('Range slider.')
    )(() =>
    <div>
        <FormField
            className="Range field"
            label='Range Slider'
            type="range"
            name="range"
        />
    </div>
))

.add('Search Field',
    compose(
    withInfo('Search field.'),
    withNotes('Search field.')
    )(() =>
    <div>
        <FormField
            className="Search field"
            label='Search field'
            type="search"
            name="search"
        />
    </div>
))

.add('Selector Field',
    compose(
    withInfo('Selector field.'),
    withNotes('Selector field.')
    )(() =>
    <div>
        Sample Selector
        <br />
        <select name="sample-selector">
            <option value="option 1">Option 1</option>
            <option value="option 2">Option 2</option>
            <option value="option 3">Option 3</option>
        </select>
    </div>
))