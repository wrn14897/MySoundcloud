import {normalize} from 'normalizr';
import * as schema from './schema';

/*
    Use schema to normalize all responses => using 'result' and 'entities'
    {
      result: "123",
      entities: {
        "articles": {
          "123": {
            id: "123",
            author: "1",
            title: "My awesome blog post",
            comments: [ "324" ]
          }
        },
        "users": {
          "1": { "id": "1", "name": "Paul" },
          "2": { "id": "2", "name": "Nicole" }
        },
        "comments": {
          "324": { id: "324", "commenter": "2" }
        }
      }
    }
 */


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
                message: error || 'Something wrong !!',
                q,
            });
        });
}

export const addTrack = (track) => (dispatch, getState) => {

    return fetch(`/track`,{
        method: 'POST',
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

}


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
export const commentTrack = (track) => (dispatch, getState) => {
    return fetch(`/track`,{
        method: 'PUT',
        body: JSON.stringify(track),
    })
    .then(response => response.json())
    .then(json => {
        dispatch({
            type: 'COMMENT_TRACK_SUCCESS',
            response: normalize(json.data, schema.track),
        });
    })
    .catch(error => {
        dispatch({
            type: 'COMMENT_TRACK_FAILURE',
            message: error || 'Something wrong !!',
        });
    });
};


export const deleteTrack = (track) => (dispatch, getState) => {
    return fetch(`/track`, {
        method: 'DELETE',
        body: JSON.stringify(track),
    })
    .then(response => response.json())
    .then(json => {
        dispatch({
            type: 'DELETE_TRACK_SUCCESS',
            response: normalize(json.data, schema.track),
        });
    })
    .catch(error => {
        dispatch({
            type: 'DELETE_TRACK_FAILURE',
            message: error || 'Something wrong !!',
        });
    });
};
