import styled from 'styled-components'
import {breakpoints} from '../common/constants'

export default styled.div`
    height: 100%;
    @supports not (display: grid) {
        .header,
        .main,
        .footer {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${breakpoints.desktop} {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: 70px auto 40px;
            grid-template-areas: 'header header' 'main main' 'footer footer';

            .header {
                grid-area: header;
            }

            .main {
                grid-area: main;
                display: grid;
                align-items: center;
            }

            .footer {
                grid-area: footer;
            }
        }

        @media ${breakpoints.largeDesktop} {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-areas: 'header header header' 'main main main' 'footer footer footer';
        }
    }
`
