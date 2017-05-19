import {combineReducers} from 'redux';
import searchTracks, * as searchTracksSelectors from './searchTracks';
import createTrackList, * as trackListSelectors from './trackList';
import trackById, * as trackByIdSelectors       from './trackById';

/**********************************************************************/
//TODO -> Let's use combineReducers to construct state tree here
/**********************************************************************/


const app = combineReducers({
    searchTracks,
})

export default app;


/* Selectors */
export const getSearchTracks = (state) =>
    searchTracksSelectors.getTracks(state.searchTracks);
export const getIsSearching  = (state) =>
    searchTracksSelectors.getIsSearching(state.searchTracks);
export const getSearchErrorMessage = (state) =>
    searchTracksSelectors.getErrorMessage(state.searchTracks);



/**********************************************************************/
//TODO -> Let's implement search track selectors here
/**********************************************************************/
export const getTracks = (state, filter) => state
export const getIsFetching = (state, filter) => state
export const getErrorMessage = (state, filter) => state
