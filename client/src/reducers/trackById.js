import omit from 'lodash/omit';

/*
    Consider cases we need to create hash table for track
 */
const trackById = (state = {}, action) => {
    return state;
};

export default trackById;
export const getTrackById = (state, id) => state[id];
