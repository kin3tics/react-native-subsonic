import React, { Component } from 'react'
import  { Text, ProgressBar, View, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import { connect } from 'react-redux';
import Howler from 'howler';

import Visualizer from './Visualizer';

import { getDurationArray } from '../helpers/audio-helper'

import { pauseSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist, seekSong } from '../actions/mediaPlayer-actions'
import {
    MENU_MAIN,
    setMenu,
 } from '../actions/menu-actions'

import styles from '../styles/global'
import np_styles from '../styles/nowPlaying'


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
        let {dispatch} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_MAIN))}>
                <View style={[styles.background2, np_styles.fs_menu]}>
                    <Image source={require('../images/navigation/ic_menu_white_24dp.png')} style={{height:24,width:24}}/>
                </View>
            </TouchableWithoutFeedback>
        )
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
        console.log(uri);
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        var playButton = !nowPlaying.isPlaying
                ?(<Image style={{height: 30, width:30}} source={require('../images/av/ic_play_arrow_white_24dp.png')}/>)
                :(<Image style={{height: 30, width:30}} source={require('../images/av/ic_pause_white_24dp.png')}/>);
        var seekProgress = (nowPlaying.songSeek / song.duration);
        var titleColor = (nowPlaying.songPalette && nowPlaying.songPalette.LightVibrant) ? nowPlaying.songPalette.LightVibrant.getTitleTextColor()
                            : '#FFF';
        console.log(titleColor);
        return (
            <View style={[np_styles.fs_main, {width: width, height: height}]}> 
                <View style={np_styles.fs_visualizer}><Visualizer /></View>
                {this.renderMenuIcon()}
                <View style={[np_styles.fs_mediaSection, styles.centeredcontainer]} >
                    <Image 
                        source={{ uri: uri}}
                        style={{height: 350, width: 350}} />
                    <Text numberOfLines={1} style={[{color: '#FFF'}, np_styles.fs_songText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].title}</Text>
                    <Text numberOfLines={1} style={[{color: '#FFF'}, np_styles.fs_artistText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].artist}</Text>
                    <View style={np_styles.fs_progressBar}
                        onStartShouldSetResponder={(ev) => true}
                        onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
                        onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
                        >
                        <ProgressBar
                            style={{borderRadius: 10, height: 12}}
                            color={'#FFF'}
                            trackColor={'#545454'}
                            progress={seekProgress}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback onPress={() => dispatch(playPreviousSongInPlaylist())}>
                            <Image style={{height: 30, width:30}} source={require('../images/av/ic_skip_previous_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => dispatch(pauseSongInPlaylist())}>
                            {playButton}
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => dispatch(playNextSongInPlaylist())}>
                            <Image style={{height: 30, width:30}} source={require('../images/av/ic_skip_next_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            </View>);
        }
}

export default connect(mapStateToProps)(NowPlaying)