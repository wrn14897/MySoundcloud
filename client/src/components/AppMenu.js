import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import { Menu, Icon, Button} from 'semantic-ui-react';
import {getIsShowingPlayer} from '../reducers';
import {toggleShowingPlayer} from '../actions';


import SearchBar from './SearchBar';
const AppMenu = ({filter, isShowingPlayer, toggleShowingPlayer}) => (
    <Menu pointing inverted stackable>
        <Menu.Item header color={'orange'} active>
            <Icon name='soundcloud' />
            My Soundcloud
        </Menu.Item>
        <Menu.Item name='ALL'        as={Link}  to='/all'         active={filter === 'all'} >
            <Icon name='like' size='large'/>
        </Menu.Item>
        <Menu.Item name='COMMENTED'  as={Link}  to='/commented'   active={filter === 'commented'} >
            <Icon name='comment' size='large'/>
        </Menu.Item>
        <Menu.Item name='NO COMMENT' as={Link}  to='/nocomment'   active={filter === 'nocomment'} >
            <Icon name='comment outline' size='large'/>
        </Menu.Item>
        <Menu.Item>
            <Button basic content='Player' icon='music' labelPosition='left' onClick={toggleShowingPlayer} active={isShowingPlayer} inverted color='green' />
        </Menu.Item>
        <Menu.Menu position='right'>
            <Menu.Item>
                <SearchBar />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

const mapStateToProps = (state, ownProps) => {
    const filter            = ownProps.match.params.filter || 'all';
    const isShowingPlayer   = getIsShowingPlayer(state);
    return {
        filter,
        isShowingPlayer,
    };
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({toggleShowingPlayer}, dispatch);
};


AppMenu.propTypes = {
    filter              : PropTypes.oneOf(['all', 'commented', 'nocomment', null]).isRequired,
    isShowingPlayer     : PropTypes.bool.isRequired,
    toggleShowingPlayer : PropTypes.func.isRequired,
};


export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(AppMenu)
);;
