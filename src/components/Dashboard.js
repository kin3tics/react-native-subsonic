import React from 'react'
import  { Text, TextInput, View, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux';

import {
    MENU_MAIN,
    MENU_LIBRARY,
    MENU_PLAYLIST
 } from '../actions/menu-actions'

import styles from '../styles/global'

import Menu from './Menu'
import ArtistList from './ArtistList'
import ArtistDetail from './ArtistDetail'
import PlaylistList from './PlaylistList'
import PlaylistDetail from './PlaylistDetail'
import NowPlayingSidebar from './NowPlayingSidebar';

const mapStateToProps = state => ({
    menu: state.menu
})

const Dashboard = ({ dispatch, menu }) => {
    let leftView = null;
    let detailView = null;
    switch(menu.active) {
        case MENU_LIBRARY:
            leftView = (<ArtistList />);
            detailView = (<ArtistDetail />);
            break;
        case MENU_PLAYLIST:
            leftView = (<PlaylistList />);
            detailView = (<PlaylistDetail />);
            break;
        case MENU_MAIN:
        default:
            leftView = (<Menu />);
            detailView = (<ArtistDetail />);
            break;
    }


    return (<View style={{flexDirection:'row'}}>
            <View>
                {leftView}
            </View>
            <View>
                {detailView}
            </View>
            <View>
                <NowPlayingSidebar />
            </View>
        </View>)
}

export default connect(mapStateToProps)(Dashboard)