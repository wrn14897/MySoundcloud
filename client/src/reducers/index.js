import {combineReducers} from 'redux';
import searchTracks, * as searchTracksSelectors from './searchTracks';
import createTrackList, * as trackListSelectors from './trackList';
import trackById, * as trackByIdSelectors       from './trackById';


const trackListByFilter = combineReducers({
    'all'       : createTrackList('all'),
    'commented' : createTrackList('commented'),
    'nocomment' : createTrackList('nocomment'),
});

const app = combineReducers({
    searchTracks,
    trackListByFilter,
    trackById,
})

export default app;


//Selectors
export const getSearchTracks = (state) =>
    searchTracksSelectors.getTracks(state.searchTracks);
export const getIsSearching  = (state) =>
    searchTracksSelectors.getIsSearching(state.searchTracks);
export const getSearchErrorMessage = (state) =>
    searchTracksSelectors.getErrorMessage(state.searchTracks);

export const getTracks = (state, filter) => {
    const {ids} = state.trackListByFilter[filter];
    return ids.map(id => trackByIdSelectors.getTrackById(state.trackById, id));
};
export const getIsFetching = (state, filter) =>
    trackListSelectors.getIsFetching(state.trackListByFilter[filter])
export const getErrorMessage = (state, filter) =>
    trackListSelectors.getErrorMessage(state.trackListByFilter[filter])
