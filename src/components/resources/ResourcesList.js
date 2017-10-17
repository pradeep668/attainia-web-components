import uuid from 'uuid/v4'
import styled from 'styled-components'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ResourcesHeader from './ResourcesHeader'

const ResourcesPage = styled.section`
    height: 100%;

    @supports not (display: grid) {
        display: block;
    }

    @supports (display: grid) {
        display: grid;
        grid-auto-rows: max-content;
        height: 100%;
    }
`
class ResourcesList extends Component {
    componentWillMount() {
        this.props.findAllResources()
    }

    render() {
        const {resources} = this.props

        return (
            <ResourcesPage>
                <ResourcesHeader className="resourcesHeader" />
                <ul className="listGroup">
                    {resources.map(({id, name}) => (
                        <li className="listGroupItem" key={uuid()}>
                            <Link key={uuid()} to={`/resources/${id}`}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </ResourcesPage>
        )
    }
}

ResourcesList.propTypes = {
    findAllResources: PropTypes.func.isRequired,
    resources: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        })
    )
}

ResourcesList.defaultProps = {
    resources: []
}

export default ResourcesList
