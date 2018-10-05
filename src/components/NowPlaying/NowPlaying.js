import React, { Component } from 'react'
import  { Text, ProgressBar, View, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import { connect } from 'react-redux';
import Howler from 'howler';

import Visualizer from '../Visualizer';
import NowPlayingMenu from './NowPlayingMenu';

import { getDurationArray } from '../../helpers/audio-helper'

import { pauseSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist, seekSong } from '../../actions/mediaPlayer-actions'
import {
    MENU_MAIN,
    setMenu,
 } from '../../actions/menu-actions'

import styles from '../../styles/global'
import np_styles from '../../styles/nowPlaying'
import m_styles from '../../styles/menu'

function getColorForMissingArtwork(index) {
    let i = index % 5
    switch(i)
    {
        case 1:
            return styles.missingArtworkColor1
        case 2:
            return styles.missingArtworkColor2
        case 3:
            return styles.missingArtworkColor3
        case 4:
            return styles.missingArtworkColor4
        case 0:
        default:
            return styles.missingArtworkColor5
    }

}

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

class NowPlaying extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isMenuActive: false
        }
    }

    toggleMenu() {
        var menuActive = this.state.isMenuActive;
        this.setState({ isMenuActive: !menuActive })
    }

    onTouchEvent(name, ev) {
        let {dispatch, nowPlaying} = this.props;
        //element is set to 350 width
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        
        var percentDuration = ev.nativeEvent.locationX / 350
        var seekValue = percentDuration * song.duration;

        dispatch(seekSong(seekValue));
    }

    renderMenuIcon() {
        let {dispatch, width} = this.props;
        if(width < 1000) { return null; }
        let mainMenuIcon = (
            <View>
                <TouchableWithoutFeedback
                    onPress={() => this.toggleMenu()}>
                    <View style={[m_styles.menuItem, this.state.isMenuActive ? m_styles.selectedMenuItem : {}]}>
                        <Image source={require('../../images/navigation/ic_menu_white_24dp.png')} style={{height:24,width:24}}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>)

        if(!this.state.isMenuActive)
            return (
                <View
                    style={[np_styles.fs_menu, styles.background2]}>
                    {mainMenuIcon}
                </View>
            )
        else {
            return (
                <View
                    style={[np_styles.fs_menu, styles.background2]}>
                    {mainMenuIcon}
                    <NowPlayingMenu />
                </View>
            )
        }
    }

    render () {
        let {dispatch, server, nowPlaying} = this.props;
        let {width, height} = Dimensions.get('window');
        if(!nowPlaying || nowPlaying.activePlaylist.length === 0) 
            return (
                <View style={[styles.background4, styles.container, styles.centeredcontainer]}>
                    <View style={np_styles.fs_visualizer}><Visualizer /></View>
                    {this.renderMenuIcon()}
                </View>);
        let uri = nowPlaying.songCoverArtUri;
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        var playButton = !nowPlaying.isPlaying
                ?(<Image style={{height: 42, width:42}} source={require('../../images/av/ic_play_arrow_white_24dp.png')}/>)
                :(<Image style={{height: 42, width:42}} source={require('../../images/av/ic_pause_white_24dp.png')}/>);
        var seekProgress = (nowPlaying.songSeek / song.duration);
        var titleColor = (nowPlaying.songPalette && nowPlaying.songPalette.LightVibrant) ? nowPlaying.songPalette.LightVibrant.getTitleTextColor()
                            : '#FFF';
        return (
            <View style={[np_styles.fs_main, {width: width, height: height}]}> 
                <View style={np_styles.fs_visualizer}><Visualizer /></View>
                {this.renderMenuIcon()}
                <View style={[np_styles.fs_mediaSection, styles.centeredcontainer]} >
                    <Image 
                        source={{ uri: uri}}
                        style={{height: 350, width: 350, borderRadius: 10}} />
                    <View style={np_styles.fs_progressBar}
                        onStartShouldSetResponder={(ev) => true}
                        onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
                        onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
                        >
                        <ProgressBar
                            style={{borderRadius: 10, height: 12}}
                            color={'#FFF'}
                            progress={seekProgress}
                        />
                    </View>
                    <Text numberOfLines={1} style={[{color: '#FFF'}, np_styles.fs_songText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].title}</Text>
                    <Text numberOfLines={1} style={[{color: '#FFF'}, np_styles.fs_artistText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].artist}</Text>
                    <View style={{flexDirection: 'row', paddingTop: 10}}>
                        <TouchableWithoutFeedback onPress={() => dispatch(playPreviousSongInPlaylist())}>
                            <Image style={{height: 42, width:42}} source={require('../../images/av/ic_skip_previous_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => dispatch(pauseSongInPlaylist())}>
                            {playButton}
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => dispatch(playNextSongInPlaylist())}>
                            <Image style={{height: 42, width:42}} source={require('../../images/av/ic_skip_next_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>);
        }
}

export default connect(mapStateToProps)(NowPlaying)