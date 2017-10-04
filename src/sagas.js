import {fork, all} from 'redux-saga/effects'
import {
    findResourceSaga,
    findAllResourcesSaga,
    createResourceSaga,
    removeResourceSaga,
    updateResourceSaga
} from './components/resources/sagas'

export default function* root(service) {
    yield all([
        fork(findResourceSaga, service),
        fork(findAllResourcesSaga, service),
        fork(createResourceSaga, service),
        fork(removeResourceSaga, service),
        fork(updateResourceSaga, service)
    ])
}
