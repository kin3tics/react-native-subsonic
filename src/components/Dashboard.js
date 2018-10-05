import React from 'react'
import  { Text, TextInput, View, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux';

import {
    MENU_MAIN,
    MENU_LIBRARY,
    MENU_PLAYLIST,
    MENU_NOWPLAYING,
    MENU_SEARCH,
 } from '../actions/menu-actions'

import styles from '../styles/global'

import Menu from './Menu'
import ArtistList from './Library/ArtistList'
import Library from './Library/Library'
import ArtistDetail from './Library/ArtistDetail'
import PlaylistList from './PlaylistList'
import PlaylistDetail from './PlaylistDetail'
import NowPlaying from './NowPlaying/NowPlaying'
import NowPlayingSidebar from './NowPlaying/NowPlayingSidebar';
import Search from './Search'

const mapStateToProps = state => ({
    menu: state.menu,
    activePlaylist: state.mediaPlayer.activePlaylist
})

const Dashboard = ({ menu, activePlaylist }) => {
    let {width, height} = Dimensions.get('window')

    let leftView = null;
    let detailView = null;
    let showRightView = activePlaylist.length > 0;

    let windowWidth = showRightView ? width - 500 : width - 250;
    let rightView = showRightView ? (<NowPlayingSidebar />) : (<View/>)

    switch(menu.active) {
        case MENU_PLAYLIST:
            leftView = (<PlaylistList />);
            detailView = (<PlaylistDetail height={height} width={windowWidth} />);
            break;
        case MENU_NOWPLAYING:
            leftView = (<View/>)
            detailView = (<NowPlaying height={height} width={width} />)
            rightView = (<View />)
            break;
        case MENU_SEARCH:
            leftView = (<ArtistList />)
            detailView = (<Search height={height} width={windowWidth} />)
            break;
        case MENU_MAIN:
        case MENU_LIBRARY:
        default:
            leftView = (<ArtistList />);
            detailView = (<Library height={height} width={windowWidth} />);
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
                {rightView}
            </View>
        </View>)
}

export default connect(mapStateToProps)(Dashboard)