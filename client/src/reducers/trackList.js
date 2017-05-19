import {combineReducers} from 'redux';


/**********************************************************************/
//TODO -> Let's implement reducer here
/**********************************************************************/
const createTrackList = (filter) => {
    const handleComment = (state, action) => {

    }

    const ids = (state=[], action) => {
        return state
    };

    const isFetching = (state=false, action) => {
        return state
    };

    const errorMessage = (state=null, action) => {
        return state;
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
