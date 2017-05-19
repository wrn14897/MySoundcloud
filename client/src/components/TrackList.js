import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchTracks, commentTrack, deleteTrack}  from '../actions';
import {getTracks, getIsFetching, getErrorMessage} from '../reducers';
import Track   from './Track';
import {Card, Loader} from 'semantic-ui-react'



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
        const {tracks, isFetching, errorMessage, commentTrack, deleteTrack} = this.props;
        if (isFetching && !tracks.length){
            return   <Loader active inline='centered' />;
        }
        if (errorMessage && !tracks.length){
            return <p>Error...</p>;
        }

        // console.log('rerender !!');
        // console.log(tracks);
        const tracksDom = tracks.map(track => <Track key={track.id} track={track} commentTrack={commentTrack} deleteTrack={deleteTrack}/>);
        return (
            <Card.Group itemsPerRow={4} stackable>
                {tracksDom}
            </Card.Group>
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
    commentTrack    :    PropTypes.func.isRequired,
    deleteTrack     :    PropTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    const filter        = ownProps.match.params.filter || 'all';
    const tracks        = getTracks(state, filter);
    const isFetching    = getIsFetching(state, filter);
    const errorMessage  = getErrorMessage(state, filter);
    return {
        filter,
        tracks,
        isFetching,
        errorMessage,
    };
};
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({fetchTracks, commentTrack, deleteTrack}, dispatch);
};


TrackList = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(TrackList)
);
export default TrackList;
