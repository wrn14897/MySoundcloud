import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';
import { Card, Button, Form, Image} from 'semantic-ui-react'

const CLIENT_ID = "1c3aeb3f91390630d351f3c708148086";


const soundcloudConfig = {
    clientId: CLIENT_ID,
    showArtwork: false,
};
const playerConfig = {
    soundcloudConfig,
    width   : '100%',
    height  : 50,
    controls: true
}


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
        const {track, commentTrack, deleteTrack}  = this.props;
        const editArea = this.state.isEditing ?
                            <Form reply>
                                <Form.TextArea onChange={ e => {
                                        track.comment = e.target.value;
                                    }} autoHeight />
                            </Form>
                            :
                            track.comment;
        const editBtn = this.state.isEditing ?
                            <Button basic color='green' content='Save' onClick={() => this.handleSaveComment.bind(this)(track, commentTrack)} />
                            :
                            <Button basic color='green' content='Edit'onClick={() => this.toggleIsEditing()} />;

        return (
            <Card raised>
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
                <ReactPlayer
                    url={track.detail.permalink_url}
                    {...playerConfig}
                />
                <Card.Content extra>
                    <div className='ui two buttons'>
                        {editBtn}
                        <Button basic color='red' onClick={() => deleteTrack(track)} >Delete</Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

Track.propTypes = {
    track       : PropTypes.object.isRequired,
    commentTrack: PropTypes.func.isRequired,
    deleteTrack : PropTypes.func.isRequired,
};


export default Track;
