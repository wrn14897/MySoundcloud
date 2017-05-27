import {combineReducers} from 'redux';


/**********************************************************************/
//TODO -> Let's implement createTrackList reducer
/**********************************************************************/
const createTrackList = (filter) => {
    const handleComment = (state, action) => {

    }

    const ids = (state=[], action) => {
        switch(action.type){
            case 'FETCH_TRACKS_SUCCESS':
                return filter === action.filter ?
                    action.response.result : state;
            case 'ADD_TRACK_SUCCESS':
                return filter === 'commented' ?
                    state : [...state, action.response.result];
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
