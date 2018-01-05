import styled from 'styled-components'

export default styled.div`
    height: 100%;
    @supports not (display: grid) {
        display: flex;
    }
    @supports (display: grid) {
        display: grid;
    }
    justify-content: center;
    align-items: center;
`
