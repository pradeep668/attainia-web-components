import React from 'react'

import {ContentCentered, ContentHeader, ContentWrapper} from './components/layout'

const App = () =>
    <ContentWrapper>
        <ContentHeader hasAddButton />
        <ContentCentered>
            <h1>Welcome to our site!</h1>
        </ContentCentered>
    </ContentWrapper>

export default App
