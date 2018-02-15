/* eslint max-len: "off" */
import React from 'react'
import styled from 'styled-components'

import mockup from '../../images/mockup.png'

const Assignment = styled.section`
    width: 100%;
    height: 100%;

    @supports(display: grid) {
        display: grid;
        grid-template-rows: 5em 10em 300px;
        grid-template-columns: 960px;
        justify-content: center;
        justify-items: center;
        grid-row-gap: 2em;
        align-items: center;
    }
`
const Instructions = styled.article`
    @supports(display: grid) {
        display: grid;
        grid-row-gap: 1em;
    }
`
const Mockup = styled.img`
    width: 960px;
`

export default () =>
    <Assignment>
        <h1>CSS and JavaScript Coding Assignment</h1>
        <Instructions>
            <p>To test your front-end mettle, we would like to challenge you to build a React JavaScript web component. However, rather than focusing on the complexities of Redux state management we would like you to focus on markup and styling, specifically how well you can de-compose a UX mockup into CSS and basic markup.</p>
            <p>Build one or more components in this directory that mimic the look-and-feel of this static image (similar to what a UX team would deliver to the front-end developers to build)</p>
            <p>To facilitate this task, take a look at how we use the <a href="https://www.styled-components.com">styled-components</a> to allow us to write (nearly) native CSS inside a JavaScript component. We have a handful of examples of low-level components in our public attainia-web-components/src/components/layout/ that are just presentational components.</p>
            <p>Also, even though passing props into React components is a very common thing, you do not often need many of them in a presentational-only component, although it is a good idea to become familiar with <a href="https://www.styled-components.com/docs/basics#adapting-based-on-props">how you can drive functionality inside of a styled-component by props that are passed into it</a>).</p>
        </Instructions>
        <Mockup src={mockup} />
    </Assignment>
