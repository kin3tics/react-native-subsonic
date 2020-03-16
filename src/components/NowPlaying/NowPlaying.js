import React, { Component } from 'react'
import  { Text, ProgressBar, View, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import { connect } from 'react-redux';
import Howler from 'howler';

import Visualizer from '../Visualizer';
import Menu from '../menu/index';

import { getDurationArray } from '../../helpers/audio-helper'

import { pauseSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist, seekSong } from '../../actions/mediaPlayer-actions'

import styles from '../../styles/global'
import np_styles from '../../styles/nowPlaying'
import m_styles from '../../styles/menu'

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

const NowPlaying = ({dispatch, server, nowPlaying}) => {
    function onTouchEvent(name, ev) {
        let {dispatch, nowPlaying} = this.props;
        //element is set to 350 width
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        
        var percentDuration = ev.nativeEvent.locationX / 350
        var seekValue = percentDuration * song.duration;

        dispatch(seekSong(seekValue));
    }
    let {width, height} = Dimensions.get('window');
    if(!nowPlaying || nowPlaying.activePlaylist.length === 0) 
        return (
            <View style={[styles.background4, styles.container, styles.centeredcontainer]}>
                <View style={np_styles.fs_visualizer}><Visualizer /></View>
                <View style={{ position: 'absolute', top: 0, left: 0}} >
                    <Menu collapsible={true} width={250} />
                </View>
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
            <View style={{ position: 'absolute', top: 0, left: 0}} >
                <Menu collapsible={true} width={250} />
            </View>
            <View style={[np_styles.fs_mediaSection, styles.centeredcontainer]} >
                <Image 
                    source={{ uri: uri}}
                    style={{height: 350, width: 350, borderRadius: 10}} />
                <View style={np_styles.fs_progressBar}
                    onStartShouldSetResponder={(ev) => true}
                    onResponderGrant={onTouchEvent.bind(this, "onResponderGrant")}
                    onResponderMove={onTouchEvent.bind(this, "onResponderMove")}
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

export default connect(mapStateToProps)(NowPlaying)