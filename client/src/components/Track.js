import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Form, Image} from 'semantic-ui-react'

class Track extends Component{
    state = {
        isEditing : false,
    };
    toggleIsEditing(){
        this.setState({
            isEditing: !this.state.isEditing
        });
    }
    handleSaveComment(track, commentTrack){
        this.toggleIsEditing();
        commentTrack(track);
    }

    render(){
        const {track, commentTrack, deleteTrack, playTrack, playingTrack, isPlaying}  = this.props;
        const editArea = this.state.isEditing ?
                            <Form reply>
                                <Form.TextArea onChange={ e => {
                                        track.comment = e.target.value;
                                    }} autoHeight />
                            </Form>
                            :
                            track.comment;
        const editBtn = this.state.isEditing ?
                            <Button basic icon='save' color='green' onClick={() => this.handleSaveComment.bind(this)(track, commentTrack)} />
                            :
                            <Button basic icon='edit' color='green' onClick={() => this.toggleIsEditing()} />;
        const playBtn = (isPlaying && playingTrack && playingTrack.id === track.id) ?
                            <Button basic icon='pause' color='violet' onClick={() => playTrack(track)}/>
                            :
                            <Button basic icon='play' color='blue' onClick={() => playTrack(track)}/>;


        return (
            <Card>
                <Card.Content>
                    <Image floated='right' size='tiny' shape='circular' src={track.detail.artwork_url} />
                    <Card.Header>
                        {track.detail.title}
                    </Card.Header>
                    <Card.Meta>
                        <span className='date'>
                        {track.detail.user.username}
                        </span>
                    </Card.Meta>
                    <Card.Description>
                        {editArea}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui three buttons'>
                        {editBtn}
                        <Button basic icon='trash outline' color='red' onClick={() => deleteTrack(track)} />
                        {playBtn}
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

Track.propTypes = {
    track           : PropTypes.object.isRequired,
    commentTrack    : PropTypes.func.isRequired,
    deleteTrack     : PropTypes.func.isRequired,
    playTrack       : PropTypes.func.isRequired,
    playingTrack    : PropTypes.object,
    isPlaying       : PropTypes.bool.isRequired,
};


export default Track;
