import {combineReducers} from 'redux';


/**********************************************************************/
//TODO -> Let's implement createTrackList reducer
/**********************************************************************/
const createTrackList = (filter) => {
    const handleComment = (state, action) => {

    }

    const ids = (state=[], action) => {

    };

    const isFetching = (state=false, action) => {

    };

    const errorMessage = (state=null, action) => {

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
