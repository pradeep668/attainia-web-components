import React from 'react'

import PropTypes from 'prop-types'
import styled from 'styled-components'
import {Cell} from 'fixed-data-table-2'

import SimpleSvgIcon from '../common/SimpleSvgIcon'


export default class TooltipHeaderCell extends React.PureComponent {
    render() {
        const {headerData: {key, toolTip, name}, sortData, sortCallback, ...props} = this.props

        const FlexDiv = styled.div`
            display: flex;
        `

        const LeftFlexSpan = styled.span`
            align-items: center;
            display: flex;
            flex-grow: 3;
            order: 1;
        `

        const RightFlexSpan = styled.span`
            display: flex;
            order: 2;
            margin-left: 5px;
            width: 12px;
        `

        const HeaderLink = styled.a`
            text-decoration: underline;
            width: 100%;
            :hover {
                cursor: pointer;
            }
        `

        const SortIcon = styled(SimpleSvgIcon)`
        `
        let sortIcon = ''

        const handleSort = () => {
            const sortDir = (sortIcon === 'arrow_down') ? 'desc' : 'asc'

            sortCallback(key, sortDir)
        }

        if (sortData.columnKey === key) {
            sortIcon = (sortData.sortDirection === 'asc') ? 'arrow_down' : 'arrow_up'
        }

        return (
            <Cell {...props} data-tip={toolTip} data-for={'header-tooltip'}>
                <FlexDiv>
                    <LeftFlexSpan>
                        <HeaderLink onClick={handleSort}>{name}</HeaderLink>
                    </LeftFlexSpan>
                    <RightFlexSpan>
                        <SortIcon icon={sortIcon} />
                    </RightFlexSpan>
                </FlexDiv>
            </Cell>
        )
    }
}

TooltipHeaderCell.propTypes = {
    headerData: PropTypes.shape({
            name: PropTypes.string,
            toolTip: PropTypes.string,
            key: PropTypes.string,
            width: PropTypes.number,
            fixed: PropTypes.bool,
            columnType: PropTypes.symbol
        }
    ).isRequired,
    sortData: PropTypes.shape({
        columnKey: PropTypes.string,
        sortDirection: PropTypes.string
    }),
    sortCallback: PropTypes.func
}
