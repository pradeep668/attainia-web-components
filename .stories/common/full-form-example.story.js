/* eslint "max-len": "off" */
import React from 'react'
import {compose} from 'ramda'
import {storiesOf} from '@storybook/react'
import {withNotes} from '@storybook/addon-notes'
import {withInfo} from '@storybook/addon-info'
import styled, {ThemeProvider} from 'styled-components'

import theme from '@theme'
import ContentCentered from '@awc/layout/ContentCentered'
// Combined component import using what I learned from Login.js
import {FormField, Form} from '@awc/common'

const Spaced = styled.div`
    display: grid;
    grid-column-gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`
const paragraphStyles = {
    fontSize: '14px', textAlign: 'center'
}

storiesOf('Form Sample', module)
    .addDecorator(StoryComponent => (
        <ThemeProvider theme={theme}>
            <ContentCentered>
                <StoryComponent />
            </ContentCentered>
        </ThemeProvider>
    ))
    .add('Sample Field',
        compose(
            withInfo('An input element type of text box.'),
            withNotes('An input element type of text box.')
        )(() =>
            <div>
                <Form id="storybook-form">
                    <header style={{fontSize: '18px', textAlign: 'center'}}>Sample Form</header>
                    <FormField
                      className="Form Field"
                      label="Text Input Field"
                      type="text"
                      name="text"
                      placeholder="Write Text Here"
                    />
                    <br />
                    <FormField
                      className="Password Field"
                      label="Password Input Field"
                      type="password"
                      name="password"
                      placeholder="Write Password Here"
                    />
                    <br />
                    <FormField
                      className="Email Field"
                      label="Email Field"
                      type="email"
                      name="email"
                      placeholder="Enter Email Here"
                    />
                    <br />
                    <p style={paragraphStyles}>Radio Buttons and Checkboxes</p>
                    <br />
                    <Spaced>
                        <FormField
                          className="checked-box"
                          label="Checked Box"
                          type="checkbox"
                          name="checked-box"
                          checked="0"
                        />
                        <FormField
                          className="unchecked-box"
                          label="Unchecked Box"
                          type="checkbox"
                          name="unchecked-box"
                        />
                        <FormField
                          className="Radio Field"
                          label="Radio Button 1"
                          type="radio"
                          name="radio"
                        />
                        <FormField
                          className="Radio Field"
                          label="Radio Button 2"
                          type="radio"
                          name="radio"
                        />
                    </Spaced>
                    <br />
                    <p style={paragraphStyles}>Mess with Time</p>
                    <br />
                    Date:
                    <FormField
                      className="DatePicker Field"
                      type="date"
                      name="date"
                    />
                    <br />
                    Date/Time:
                    <FormField
                      className="DateTime Field"
                      type="datetime-local"
                      name="datetime-local"
                    />
                    <br />
                    Month:
                    <FormField
                      className="Month Field"
                      type="month"
                      name="month"
                    />
                    <br />
                    Week:
                    <FormField
                      className="Week Field"
                      type="week"
                      name="week"
                    />
                    <br />
                    <p style={paragraphStyles}>Pick a File and Color</p>
                    <br />
                    Pick a Color:
                    <br />
                    <FormField
                      className="Color Field"
                      type="color"
                      name="color"
                    />
                    <br />
                    Upload a File:
                    <FormField
                      className="File Picker Field"
                      type="file"
                      name="file"
                    />
                    <br />
                    <FormField
                      className="Submit"
                      type="submit"
                      name="submit"
                    />
                </Form>
            </div>
        )
    )
