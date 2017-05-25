import {combineReducers} from 'redux';



const isShowingPlayer = (state=false, action) => {
    if (action.type === 'TOGGLE_SHOWING_PLAYER'){
        return !state;
    }
    return state;
};
const playingId = (state=null, action) => {
    if (action.type === 'PLAY_TRACK'){
        return action.response.result;
    }
    return state;
};
const isPlaying = (state=false, action) => {
    if (action.type === 'PLAY_TRACK'){
        return !state;
    }
    return state;
};

const player = combineReducers({
    isShowingPlayer,
    playingId,
    isPlaying,
});


export default player;

export const getIsShowingPlayer = (state) => state.isShowingPlayer;
export const getPlayingTrackId  = (state) => state.playingId;
export const getIsPlaying       = (state) => state.isPlaying;
