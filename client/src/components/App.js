import React from 'react';
import PropTypes from 'prop-types';
import AppMenu from './AppMenu';
import TrackList from './TrackList';
import { connect } from 'react-redux';
import {getIsShowingPlayer} from '../reducers';
import {Sidebar} from 'semantic-ui-react';
import Player from './Player';


const App = ({isShowingPlayer}) => (
    <div>
        <Sidebar.Pushable>
            <Sidebar animation='overlay' direction='top' visible={isShowingPlayer}>
                <Player />
            </Sidebar>
            <Sidebar.Pusher>
                <AppMenu />
                {/* <TrackList /> */}
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    </div>
);

const mapStateToProps = (state, ownProps) => {
    const isShowingPlayer = getIsShowingPlayer(state);
    return {
        isShowingPlayer,
    };
};

App.propTypes = {
    isShowingPlayer : PropTypes.bool.isRequired,
};


export default connect(mapStateToProps)(App);
