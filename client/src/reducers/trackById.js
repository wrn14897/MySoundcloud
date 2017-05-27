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
            return {...state, ...action.response.entities.tracks};
        default:
            return state;
    }
};

export default trackById;
export const getTrackById = (state, id) => state[id];
