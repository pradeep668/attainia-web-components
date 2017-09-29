export const findAllResources = service =>
    service.get('/resources/')

export const findResource = (service, id) =>
    service.get(`/resources/${id}`)

export const removeResource = (service, id) =>
    service.delete(`/resources/${id}`)

export const updateResource = (service, id, resource) =>
    service.post(`/resources/${id}`, resource)

export const createResource = (service, resource) =>
    service.post('/resources/', resource)
