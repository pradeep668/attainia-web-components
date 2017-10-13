import uuid from 'uuid/v4'
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ResourcesHeader from './ResourcesHeader'

class ResourcesList extends Component {
    componentWillMount() {
        this.props.findAllResources()
    }

    render() {
        const {resources} = this.props

        return (
                <ResourcesHeader>
                <ul className="listGroup">
                    {resources.map(({id, name}) => (
                        <li className="listGroupItem" key={uuid()}>
                            <Link key={uuid()} to={`/resources/${id}`}>
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
                </ResourcesHeader>
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
