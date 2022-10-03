import { createSlice } from "@reduxjs/toolkit";


// we create slice (reducer and actions) for particular component

// declare initial state
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// createSlice takes 4 arguments:
// 1) name of our slicer,
// 2) initial state
// 3) reducers (in this objects we create the actions, and we write wthat should happen in that case)
// 4) 

// also work with lib that creates immutability
const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroesLoadingStatus = 'idle';
            state.heroes = action.payload;
        },
        heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroCreated: (state, action) => {
            state.heroes.push(action.payload)
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    }
});

// we use destructurisation to get actions and reducer
const {actions, reducer} = heroesSlice;

// export all
export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;