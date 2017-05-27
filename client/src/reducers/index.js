import {combineReducers} from 'redux';
import searchTracks,    * as searchTracksSelectors  from './searchTracks';
import createTrackList, * as trackListSelectors     from './trackList';
import trackById,       * as trackByIdSelectors     from './trackById';
import player,          * as playerSelectors        from './player';


/**********************************************************************/
//TODO -> Let's use combineReducers to construct state tree here
/**********************************************************************/
const trackListByFilter = combineReducers({
    all         : createTrackList('all'),
    commented   : createTrackList('commented'),
    nocomment   : createTrackList('nocomment'),
});
const app = combineReducers({
    trackListByFilter,
    trackById,
    searchTracks,
    player,
});

export default app;


//Selectors
export const getSearchTracks = (state) =>
    searchTracksSelectors.getTracks(state.searchTracks);
export const getIsSearching  = (state) =>
    searchTracksSelectors.getIsSearching(state.searchTracks);
export const getSearchErrorMessage = (state) =>
    searchTracksSelectors.getErrorMessage(state.searchTracks);
export const getIsShowingPlayer = (state) =>
    playerSelectors.getIsShowingPlayer(state.player);
export const getPlayingTrack = (state) => {
    const id    = playerSelectors.getPlayingTrackId(state.player);
    return id ? trackByIdSelectors.getTrackById(state.trackById, id) : null;
};
export const getIsPlaying = (state) =>
    playerSelectors.getIsPlaying(state.player);



/**********************************************************************/
//TODO -> Let's implement selectors here
/**********************************************************************/
export const getTracks = (state, filter) => {
    const ids = trackListSelectors.getIds(state.trackListByFilter[filter]);
    return ids.map(id => trackByIdSelectors.getTrackById(state.trackById ,id));
};
export const getIsFetching = (state, filter) =>
    trackListSelectors.getIsFetching(state.trackListByFilter[filter]);
export const getErrorMessage = (state, filter) =>
    trackListSelectors.getErrorMessage(state.trackListByFilter[filter]);
