import React from 'react'
import  { View } from 'react-native'
import { connect } from 'react-redux';

import {
    MENU_MAIN,
    MENU_LIBRARY,
    MENU_PLAYLIST,
    MENU_NOWPLAYING,
    MENU_SEARCH,
 } from '../../actions/menu-actions'

import ArtistList from '../../components/Library/ArtistList'
import Library from '../../components/Library/Library'
import PlaylistList from '../../components/PlaylistList'
import PlaylistDetail from '../../components/PlaylistDetail'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import NowPlayingSidebar from '../../components/NowPlaying/NowPlayingSidebar';
import Search from '../../components/Search'

const mapStateToProps = state => ({
    menu: state.menu,
    activePlaylist: state.mediaPlayer.activePlaylist
})

const DesktopDashboardScreen = ({ dimensions, menu, activePlaylist }) => {
    let {width, height} = dimensions;

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

export default connect(mapStateToProps)(DesktopDashboardScreen)