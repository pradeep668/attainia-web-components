import {call, put, takeEvery} from 'redux-saga/effects'

import types from './types'
import {createResource, updateResource, removeResource, findResource, findAllResources} from './api'

// PROCESS FLOW:
// -------------
// call API ->
// result ->
// dispatch an action ->
// reduce action ->
// updates the state ->
// ui changes
// ------------

function* callCreateResource(service, {resource}) {
    const {data} = yield call(createResource, service, resource)
    yield put({type: types.FOUND_ALL_RESOURCES, resources: data.resources})
}

export function* createResourceSaga(service) {
    yield takeEvery(types.CREATE_RESOURCE, callCreateResource, service)
}

function* callUpdateResource(service, {resource}) {
    yield call(updateResource, service, resource)
}

export function* updateResourceSaga(service) {
    yield takeEvery(types.UPDATE_RESOURCE, callUpdateResource, service)
}

function* callRemoveResource(service, {id}) {
    yield call(removeResource, service, id)
    yield put({type: types.REMOVED_RESOURCE, id})
}

export function* removeResourceSaga(service) {
    yield takeEvery(types.REMOVE_RESOURCE, callRemoveResource, service)
}

function* callFindAllResources(service) {
    const {data} = yield call(findAllResources, service)
    yield put({type: types.FOUND_ALL_RESOURCES, resources: data.resources})
}

export function* findAllResourcesSaga(service) {
    yield takeEvery(types.FIND_ALL_RESOURCES, callFindAllResources, service)
}

function* callFindResource(service, {id}) {
    const {data} = yield call(findResource, service, id)
    yield put({type: types.FOUND_RESOURCE, resource: data})
}

export function* findResourceSaga(service) {
    yield takeEvery(types.FIND_RESOURCE, callFindResource, service)
}
