import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


// we create slice (reducer and actions) for particular component

// declare initial state
const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

// create fetching action
// use createAsyncThunk for it

// 1st argm - name of action
// 2d argm - function, that returns promise


export const fetchHeroes = createAsyncThunk (
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
)

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
        heroCreated: (state, action) => {
            state.heroes.push(action.payload)
        },
        heroDeleted: (state, action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        }
    },
    // now we add our extra reducer
    // in addCase => what action, what we will do
    extraReducers:
        (builder) => {
            builder.addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
                    .addCase(fetchHeroes.fulfilled, (state, action) => {
                        state.heroesLoadingStatus = 'idle';
                        state.heroes = action.payload;
                    })
                    .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
                    .addDefaultCase(()=>{})
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