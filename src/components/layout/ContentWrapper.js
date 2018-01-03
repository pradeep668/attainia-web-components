import styled from 'styled-components'

export default styled.section`
    height: 100%;

    @supports not (display: grid) {
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        grid-auto-rows: max-content;
    }
`
