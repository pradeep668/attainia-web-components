import types from './types'

export const sortData = (column, direction) => ({column, direction, type: types.SORT_DATA})
export const nextPage = pageNumber => ({pageNumber, type: types.NEXT_PAGE})
