import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {getPlayingTrack, getIsPlaying} from '../reducers';
import {toggleShowingPlayer, playTrack} from '../actions';
import { Segment, Progress, Button, Header, Image} from 'semantic-ui-react';
import SoundCloudAudio from 'soundcloud-audio';

const CLIENT_ID = "1c3aeb3f91390630d351f3c708148086";
const scPlayer = new SoundCloudAudio(CLIENT_ID);



class Player extends Component{
    state = {
        progress : 0,
    };
    componentDidMount(){
        setInterval(() => {
            this.updateProgressBar();
        }, 100);
    }
    stop(){
        const {playingTrack, playTrack, isPlaying} = this.props;
        if (isPlaying){
            this.setState({
                progress: 0,
            });
            scPlayer.stop();
            playTrack(playingTrack);
        }
    }

    updateProgressBar(){
        const {isPlaying} = this.props;
        if (scPlayer.audio && isPlaying){
            const progress = Math.floor(scPlayer.audio.currentTime * 100 / scPlayer.audio.duration);
            if (progress){
                this.setState({
                    progress,
                });
            }
        }
    }

    streamNow(track, isPlaying){
        if (!isPlaying) return scPlayer.pause();
        if (track && track.detail && track.detail.stream_url){
            scPlayer.play({streamUrl: track.detail.stream_url});
        }
    }
    render(){
        const {toggleShowingPlayer, playTrack, playingTrack, isPlaying} = this.props;
        const {progress} = this.state;
        this.streamNow(playingTrack, isPlaying);

        if (!playingTrack){
            return (
                <Segment inverted>
                    <Header as='h2' icon textAlign='center'>
                        <Header.Content>
                            No track is playing...
                        </Header.Content>
                    </Header>
                    <Button basic content='Close' icon='close' labelPosition='left' inverted color='red' onClick={toggleShowingPlayer} />
                </Segment>
            );
        }

        const playBtn = isPlaying ?
                            <Button basic content='Pause' icon='pause' labelPosition='left' inverted color='blue' onClick={() => playTrack(playingTrack)} />
                            :
                            <Button basic content='Play' icon='play' labelPosition='left' inverted color='blue' onClick={() => playTrack(playingTrack)} />

        return (
            <Segment inverted>
                <Header as='h2' icon textAlign='center'>
                    <Image shape='circular' src={playingTrack.detail.artwork_url} />
                    <Header.Content>
                        {playingTrack.detail.title}
                    </Header.Content>
                </Header>
                <Progress percent={progress} color='teal'  size='small' indicating />
                {playBtn}
                {isPlaying && <Button basic content='Stop'  icon='stop'  labelPosition='left' inverted color='grey' onClick={() => this.stop.bind(this)()} />}
                <Button basic content='Close' icon='close' labelPosition='left' inverted color='red' onClick={toggleShowingPlayer} />
            </Segment>
        );
    }
};

Player.propTypes = {
    toggleShowingPlayer : PropTypes.func.isRequired,
    playTrack           : PropTypes.func.isRequired,
    playingTrack        : PropTypes.object,
    isPlaying           : PropTypes.bool.isRequired,
};

const mapStateToProps = (state, ownProps) => {
    const playingTrack = getPlayingTrack(state);
    const isPlaying    = getIsPlaying(state);
    return {
        playingTrack,
        isPlaying,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({toggleShowingPlayer, playTrack}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);
