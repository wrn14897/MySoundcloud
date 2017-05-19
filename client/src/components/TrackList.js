import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router';
import {fetchTracks, commentTrack, deleteTrack}  from '../actions';
import {getTracks, getIsFetching, getErrorMessage} from '../reducers';
import Track   from './Track';
import {Card, Loader} from 'semantic-ui-react'


/**********************************************************************/
//TODO -> Let's implement TrackList component here
/**********************************************************************/
class TrackList extends Component{

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

export default TrackList;
