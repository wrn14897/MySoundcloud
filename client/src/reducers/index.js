import {combineReducers} from 'redux';
import searchTracks,    * as searchTracksSelectors  from './searchTracks';
import createTrackList, * as trackListSelectors     from './trackList';
import trackById,       * as trackByIdSelectors     from './trackById';
import player,          * as playerSelectors        from './player';


/**********************************************************************/
//TODO -> Let's use combineReducers to construct state tree here
/**********************************************************************/
const app = combineReducers({
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
export const getTracks = (state, filter) => state;
export const getIsFetching = (state, filter) => state;
export const getErrorMessage = (state, filter) => state;
