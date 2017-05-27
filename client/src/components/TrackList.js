import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchTracks, commentTrack, deleteTrack, playTrack}  from '../actions';
import {getTracks, getIsFetching, getErrorMessage, getPlayingTrack, getIsPlaying} from '../reducers';
import Track   from './Track';
import {Card, Loader, Segment} from 'semantic-ui-react'


/**********************************************************************/
//TODO -> Let's implement TrackList component here
/**********************************************************************/
class TrackList extends Component{

    componentDidMount(){
        this.fetchTracks();
    }
    componentDidUpdate(prevProps){
        if (prevProps.filter !== this.props.filter){
            this.fetchTracks();
        }
    }

    fetchTracks(){
        const {filter, fetchTracks} = this.props;
        fetchTracks(filter).then(() => {});
    }
    render(){
        const {tracks, isFetching, errorMessage, commentTrack, deleteTrack, playTrack, playingTrack, isPlaying} = this.props;
        if (isFetching && !tracks.length){
            return <Loader active inline='centered' />;
        }
        if (errorMessage && !tracks.length){
            return <p>Error...</p>;
        }
        const tracksDom = tracks.map(track => <Track key={track.id} track={track} commentTrack={commentTrack} deleteTrack={deleteTrack} playTrack={playTrack} playingTrack={playingTrack} isPlaying={isPlaying} />);
        return (
            <Segment secondary padded>
                <Card.Group itemsPerRow={4} stackable>
                    {tracksDom}
                </Card.Group>
            </Segment>
            // <h2>{filter}</h2>
        );
    }
}

TrackList.propTypes = {
    filter:         PropTypes.oneOf(['all', 'commented', 'nocomment', null]).isRequired,
    tracks:         PropTypes.arrayOf(PropTypes.shape({
        id     :    PropTypes.number.isRequired,
        detail :    PropTypes.object.isRequired,
        comment:    PropTypes.string,
    }).isRequired).isRequired,
    isFetching      :    PropTypes.bool.isRequired,
    errorMessage    :    PropTypes.string,
    fetchTracks     :    PropTypes.func.isRequired,
    // commentTrack    :    PropTypes.func.isRequired,
    // deleteTrack     :    PropTypes.func.isRequired,
    playTrack       :    PropTypes.func.isRequired,
    playingTrack    :    PropTypes.object,
    isPlaying       :    PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.match.params.filter || 'all';
    const tracks        = getTracks(state, filter);
    const isFetching    = getIsFetching(state, filter);
    const errorMessage  = getErrorMessage(state, filter);
    const playingTrack  = getPlayingTrack(state);
    const isPlaying     = getIsPlaying(state);
    return {
        filter,
        tracks,
        isFetching,
        errorMessage,
        playingTrack,
        isPlaying,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchTracks, playTrack}, dispatch);
};



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackList));
