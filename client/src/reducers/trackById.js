import omit from 'lodash/omit';


/**********************************************************************/
//TODO -> Let's implement trackById reducer
/**********************************************************************/

/*
    Consider cases we need to create hash table for track
 */
const trackById = (state = {}, action) => {
    switch(action.type){
        case 'FETCH_TRACKS_SUCCESS':
        case 'ADD_TRACK_SUCCESS':
        case 'COMMENT_TRACK_SUCCESS':
            return {...state, ...action.response.entities.tracks};
        case 'DELETE_TRACK_SUCCESS':
            const {result: id} = action.response;
            return omit(state, id);
        default:
            return state;
    }
};

export default trackById;
export const getTrackById = (state, id) => state[id];
