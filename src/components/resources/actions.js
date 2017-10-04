import types from './types'

export const createdResource = resource => ({
    resource,
    type: types.CREATED_RESOURCE
})

export const updatedResource = resource => ({
    resource,
    type: types.UPDATED_RESOURCE
})

export const removedResource = id => ({
    id,
    type: types.REMOVED_RESOURCE
})

export const foundResource = resource => ({
    resource,
    type: types.FOUND_RESOURCE
})

export const createResource = resource => ({
    resource,
    type: types.CREATE_RESOURCE
})

export const updateResource = (id, resource) => ({
    id,
    resource,
    type: types.UPDATE_RESOURCE
})

export const removeResource = id => ({
    id,
    type: types.REMOVE_RESOURCE
})

export const findResource = id => ({
    id,
    type: types.FIND_RESOURCE
})

export const findAllResources = () => ({
    type: types.FIND_ALL_RESOURCES
})
