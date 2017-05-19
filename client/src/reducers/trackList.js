import {combineReducers} from 'redux';

const createTrackList = (filter) => {
    const handleComment = (state, action) => {
        const {result: id, entities} = action.response;
        const {comment}       = entities.tracks[id];
        const commented       = (comment && (comment !== ''));
        const shouldRemove    = (filter === 'nocomment' && commented) || (filter === 'commented' && !commented);

        return shouldRemove ?
                    state.filter(entry => entry !== id) : state;

    }

    const ids = (state=[], action) => {
        switch(action.type){
            case 'FETCH_TRACKS_SUCCESS':
                return (filter === action.filter ?
                        action.response.result : state);
            case 'COMMENT_TRACK_SUCCESS':
                return handleComment(state, action);
            case 'ADD_TRACK_SUCCESS':
                return (filter !== 'commented' ?
                        [...state, action.response.result] : state);
            case 'DELETE_TRACK_SUCCESS':
                const {result: deleted_id} = action.response;
                return state.filter(entry => entry !== deleted_id);
            default:
                return state;
        }
    };

    const isFetching = (state=false, action) => {
        switch(action.type){
            case 'FETCH_TRACKS_REQUEST':
                return true;
            case 'FETCH_TRACKS_SUCCESS':
            case 'FETCH_TRACKS_FAILURE':
                return false;
            default:
                return state;
        }
    };

    const errorMessage = (state=null, action) => {
        switch(action.type){
            case 'FETCH_TRACKS_REQUEST':
            case 'FETCH_TRACKS_SUCCESS':
                return null;
            case 'FETCH_TRACKS_FAILURE':
                return action.message;
            default:
                return state;
        }
    };
    return combineReducers({
        ids,
        isFetching,
        errorMessage,
    });
};

export default createTrackList;

export const getIds             = (state) => state.ids;
export const getIsFetching      = (state) => state.isFetching;
export const getErrorMessage    = (state) => state.errorMessage;
