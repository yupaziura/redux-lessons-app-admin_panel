// now we can do requests to the server inside actions
// because we get the dispath function from thunk
import {filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/filtersSlice';




export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => {
            dispatch(filtersFetched(data))
        })
        .catch(() => dispatch(filtersFetchingError()))
}


