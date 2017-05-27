import {normalize} from 'normalizr';
import * as schema from './schema';


 /**********************************************************************/
 //TODO -> Let's implement search action creator
 /**********************************************************************/
export const searchTracks = (q) => (dispatch, getState) => {
    dispatch({
        type: 'SEARCH_TRACKS_REQUEST',
        q,
    });
    return fetch(`/search?q=${q}`)
        .then(response => response.json())
        .then(json => {
            dispatch({
                type: 'SEARCH_TRACKS_SUCCESS',
                response: json.data,
                q,
            });
        })
        .catch(error => {
            dispatch({
                type: 'SEARCH_TRACKS_FAILURE',
                message: error || 'Something went wrong.',
                q,
            });
        });
};


export const addTrack = (track) => (dispatch, getState) => {

    return fetch(`/track`,{
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(track),
    })
    .then(response => response.json())
    .then(json => {
        dispatch({
            type: 'ADD_TRACK_SUCCESS',
            response: normalize(json.data, schema.track),
        });
    })
    .catch(error => {
        dispatch({
            type: 'ADD_TRACK_FAILURE',
            message: error || 'Something wrong !!',
        });
    });
};

export const fetchTracks = (filter) => (dispatch, getState) => {
    dispatch({
        type: 'FETCH_TRACKS_REQUEST',
        filter,
    });
    return fetch(`/track?filter=${filter}`, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(json => {
        dispatch({
            type: 'FETCH_TRACKS_SUCCESS',
            response: normalize(json.data, schema.arrayOfTracks),
            filter,
        });
    })
    .catch(error => {
        dispatch({
            type: 'FETCH_TRACKS_FAILURE',
            message: error || 'Something wrong !!',
            filter,
        });
    });
};


/**********************************************************************/
//TODO -> Let's implement comment and delete action creator
/**********************************************************************/


/*
    Player
*/
export const toggleShowingPlayer = () => (dispatch, getState) => dispatch({type: 'TOGGLE_SHOWING_PLAYER', });
export const playTrack  = (track) => (dispatch, getState) => {
    //get current playing track
    const {player} = getState();
    const {playingId, isPlaying} = player;

    //If isPlaying => pause the track first...
    if (isPlaying && (track.id !== playingId)){
        dispatch({type: 'PLAY_TRACK', response: normalize(track, schema.track)});
    };
    dispatch({type: 'PLAY_TRACK', response: normalize(track, schema.track)});
};
