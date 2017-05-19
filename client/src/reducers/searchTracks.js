import {combineReducers} from 'redux';

const tracks = (state=[], action) => {
    switch(action.type){
        case 'SEARCH_TRACKS_SUCCESS':
            return action.response;
        default:
            return state;
    }
};
const isSearching = (state=false, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS_REQUEST':
            return true;
        case 'SEARCH_TRACKS_SUCCESS':
        case 'SEARCH_TRACKS_FAILURE':
            return false;
        default:
            return state;
    }
};
const errorMessage = (state=null, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS_SUCCESS':
        case 'SEARCH_TRACKS_REQUEST':
            return null;
        case 'SEARCH_TRACKS_FAILURE':
            return action.message;
        default:
            return state;
    }
};




 const searchTracks = combineReducers({
    tracks,
    isSearching,
    errorMessage,
});

export default searchTracks;

export const getTracks        = (state) => state.tracks;
export const getIsSearching   = (state) => state.isSearching;
export const getErrorMessage  = (state) => state.errorMessage;
