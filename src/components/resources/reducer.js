import {update} from 'ramda'
import types from './types'
import initialState from './initialState'

export default (state = initialState, {type, resource, resources, id}) => {
    switch (type) {
        case types.REMOVED_RESOURCE: {
            return {
                ...state,
                detail: {},
                listing: state.listing.filter(re => re.id !== id)
            }
        }
        case types.UPDATED_RESOURCE: {
            return {
                ...state,
                detail: resource,
                listing: update(
                    state.listing.findIndex(f => f.id === id),
                    resource,
                    state.listing
                )
            }
        }
        case types.CREATED_RESOURCE: {
            return {
                ...state,
                detail: resource,
                listing: [resource, ...state.listing]
            }
        }
        case types.FOUND_RESOURCE: {
            return {
                ...state,
                detail: resource
            }
        }
        case types.FOUND_ALL_RESOURCES: {
            return {
                ...state,
                listing: resources
            }
        }
        // no default
    }

    return state
}
