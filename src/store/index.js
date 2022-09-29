import { createStore, combineReducers } from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';

const store = createStore(
    // use combine reducers to combine them
    // pass object in it
    combineReducers({heroes, filters})
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;