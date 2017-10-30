import styled from 'styled-components'

export default styled.div`
    @supports not (display: grid) {
        display: flex;
    }

    @supports (display: grid) {
        display: grid;
    }

    align-items: center;
    min-height: 100vh;
`
