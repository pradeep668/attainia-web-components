import React from 'react'

import ContentCentered from './components/layout/ContentCentered'
import ContentHeader from './components/layout/ContentHeader'
import ContentWrapper from './components/layout/ContentWrapper'
// import {DataTable} from './components/datatable/DataTable'

const App = () =>
    <ContentWrapper>
        <ContentHeader resourceCount={42} resourceType="component" />
        <ContentCentered>
            <h1>I know its you</h1>
        </ContentCentered>
    </ContentWrapper>

export default App
