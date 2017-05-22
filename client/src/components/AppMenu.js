import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Icon } from 'semantic-ui-react';
import SearchBar from './SearchBar';


const AppMenu = ({filter}) => (
    <Menu inverted stackable>
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
        <Menu.Menu position='right'>
            <Menu.Item>
                <SearchBar />
            </Menu.Item>
        </Menu.Menu>
    </Menu>
);

AppMenu.propTypes = {
    filter: PropTypes.oneOf(['all', 'commented', 'nocomment', null]).isRequired,
}

const mapStateToProps = (state, ownProps) => {
    const filter = ownProps.match.params.filter || 'all';
    return {
        filter,
    };
};



export default withRouter(connect(mapStateToProps)(AppMenu));
