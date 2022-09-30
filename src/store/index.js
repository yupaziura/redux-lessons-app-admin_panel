import { createStore, combineReducers, compose , applyMiddleware} from 'redux';
import heroes from '../reducers/heroes';
import filters from '../reducers/filters';
import ReduxThunk from 'redux-thunk';



const stringMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
        return dispatch({
            type:action
        })
    }
    else dispatch(action)
}


// усиление стора

// this function will change the work proncipals of store

// bu if we want to change ony dispatch
// we will use a middleware
// const enchencer = (createStore)=>(...args) => {
//     const store = createStore(...args);

//     const oldDispatch = store.dispatch;
//     store.dispatch = (action) => {
//         if (typeof action === 'string') {
//             return oldDispatch({
//                 type:action
//             })
//         }
//         else oldDispatch(action)
//     }
//     return store;
// }

const store = createStore(
    // use combine reducers to combine them
    // pass object in it
    combineReducers({heroes, filters})
    , 
    // we want our extension for google work too
    // but we have to pass code as a 2d argument too
    // so we can use a compose
    // compose(
    //     enchencer,
    //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    // )

    compose(
        applyMiddleware(ReduxThunk, stringMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    );

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()