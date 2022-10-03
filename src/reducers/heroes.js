import { createReducer } from '@reduxjs/toolkit';
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';

// use createReducer to create redocers
// we have to set an initial state

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// function usage
// we pass as a 1st argument initial state
// as a 2d function

// we have to create all cases
// inside we can use a mutable syntax
// lib will make it immutable

// we car use createReducer ony with createAtion

const heroes = createReducer(initialState, builder => {
    builder
        .addCase (heroesFetching, state => {
            state.heroesLoadingStatus = 'loading';
        })
        .addCase(heroesFetched, (state, action)=> {
                state.heroes = action.payload;
                state.heroesLoadingStatus = 'idle';
            })
        .addCase(heroesFetchingError, state => {
            state.heroesLoadingStatus = 'error';
        })
        .addCase(heroCreated, (state, action)=> {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        })
        .addDefaultCase(()=> {})
})

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload]
//             }
//         case 'HERO_DELETED': 
//             return {
//                 ...state,
//                 heroes: state.heroes.filter(item => item.id !== action.payload),
//             }
//         default: return state
//     }
// }

export default heroes;