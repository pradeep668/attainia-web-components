import PropTypes from 'prop-types'

import styled from 'styled-components'

import {TextCell} from './TextCell'


export const NumberCell = styled(TextCell)`
    .public_fixedDataTableCell_cellContent {
        text-align: right;
    }
`

NumberCell.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    rowIndex: PropTypes.number.isRequired,
    columnKey: PropTypes.string.isRequired
}

export default {NumberCell}
