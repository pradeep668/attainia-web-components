import React from 'react'

import {ContentCentered, ContentHeader, ContentWrapper} from './components/layout'

const App = () =>
    <ContentWrapper>
        <ContentHeader resourceCount={42} resourceType="category" />
        <ContentCentered>
            <h1>Welcome to our site!</h1>
        </ContentCentered>
    </ContentWrapper>

export default App
