import omit from 'lodash/omit';

/*
    Consider cases we need to create hash table for track
 */
const trackById = (state = {}, action) => {
    switch(action.type){
        case 'FETCH_TRACKS_SUCCESS':
        case 'ADD_TRACK_SUCCESS':
        case 'COMMENT_TRACK_SUCCESS':
            if (action.response){
                return {
                    ...state,
                    ...action.response.entities.tracks,
                };
            }
            return state;
        case 'DELETE_TRACK_SUCCESS':
            const {result: deleted_id} = action.response;
            return omit(state, deleted_id);
        default:
            return state;
    }
};

export default trackById;
export const getTrackById = (state, id) => state[id];
