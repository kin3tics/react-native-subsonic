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

import styles from '../../styles/global'
import Menu from '../../components/Menu'
import Library from '../../components/Library/Library'
import PlaylistDetail from '../../components/playlistDetail'
import NowPlaying from '../../components/NowPlaying/NowPlaying'
import NowPlayingBottombar from '../../components/NowPlaying/NowPlayingBottombar';
import Search from '../../components/Search'

const mapStateToProps = state => ({
    menu: state.menu,
    activePlaylist: state.mediaPlayer.activePlaylist
})

const MobileDashboardScreen = ({ dimensions, menu, activePlaylist }) => {
    let {width, height} = dimensions;

    let bottomView = activePlaylist.length > 0 ? (<NowPlayingBottombar width={width} />) : null ;
    let detailView = null;
    
    let detailHeight = bottomView ? height-100 : height-65;

    switch(menu.active) {
        case MENU_PLAYLIST:
            detailView = (<PlaylistDetail height={detailHeight} width={width} isMobile={true} />);
            break;
        case MENU_NOWPLAYING:
            detailView = (<NowPlaying height={detailHeight} width={width} isMobile={true} />)
            bottomView = null;
            break;
        case MENU_SEARCH:
            detailView = (<Search height={detailHeight} width={width} isMobile={true} />)
            break;
        case MENU_MAIN:
        case MENU_LIBRARY:
        default:
            detailView = (<Library height={detailHeight} width={width} isMobile={true} />);
            break;
    }
    
    return (<View style={{height: height}}>
            <Menu isMobile={true} />
            <View style={[styles.background3, {height: detailHeight}]}>
                {detailView}
            </View>
            {bottomView}
        </View>)
}

export default connect(mapStateToProps)(MobileDashboardScreen)