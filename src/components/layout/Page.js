import styled from 'styled-components'
import {breakpoints} from '../common/constants'

export default styled.div`
    height: 100%;
    @supports not (display: grid) {
        .header,
        .main,
        .sidebar,
        .footer {
            max-width: 50em;
            margin: 0 auto;
        }
    }

    @supports (display: grid) {
        @media ${breakpoints.tablet} {
            display: grid;
            grid-template-columns: 200px 1fr;
            grid-template-rows: 50px auto 40px;
            grid-template-areas: 'header header' 'sidebar main' 'footer footer';

            .header {
                grid-area: header;
            }

            .main {
                grid-area: main;
                display: grid;
                align-items: start;
            }

            .sidebar {
                grid-area: sidebar;
            }

            .footer {
                grid-area: footer;
            }
        }

        @media ${breakpoints.largeDesktop} {
            display: grid;
            grid-template-columns: 200px 1fr 1fr;
            grid-template-areas: 'header header header' 'sidebar main main' 'footer footer footer';
            .header {
                grid-area: header;
            }

            .main {
                grid-area: main;
                display: grid;
                align-items: start;
            }

            .sidebar {
                grid-area: sidebar;
            }

            .footer {
                grid-area: footer;
            }
        }
    }
`
