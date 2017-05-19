import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { Search } from 'semantic-ui-react'
import {searchTracks, addTrack} from '../actions';
import {getSearchTracks, getIsSearching, getSearchErrorMessage} from '../reducers';


class SearchBar extends Component {
    byId = {};

    _extracTracksInfo(tracks){
        return tracks.map(track => {
            //Cache track detail
            this.byId[track.id] = track;
            //Match Search component props requirement
            return {
                key: track.id,
                id: track.id,
                title: track.title,
                description: track.user.username,
                image: track.artwork_url || (track.user ? track.user.avatar_url : ''),
            };
        });
    }
    render() {
        const {searchTracks, addTrack, tracks, isSearching, errorMessage} = this.props;
        const results = this._extracTracksInfo(tracks);

        if (errorMessage && !tracks.length){
            return <p>Error in search...</p>;
        }

        return (
            <Search
                placeholder="Search Tracks..."
                loading={isSearching}
                onSearchChange={e => {
                    searchTracks(e.target.value)
                }}
                onResultSelect={(e, track) => {
                    /*
                     We need to make sure each track entry has the same schema
                     */
                    addTrack({
                        id:      track.id,
                        comment: null,
                        detail:  this.byId[track.id],
                    });
                }}
                results={results}
            />
        )
    }
}

SearchBar.propTypes = {
    tracks          :  PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isSearching     :  PropTypes.bool.isRequired,
    errorMessage    :  PropTypes.string,
    searchTracks    :  PropTypes.func.isRequired,
    addTrack        :  PropTypes.func.isRequired,
};



const mapStateToProps = (state) => {
    return {
        tracks          :   getSearchTracks(state),
        isSearching     :   getIsSearching(state),
        errorMessage    :   getSearchErrorMessage(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({searchTracks, addTrack}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
