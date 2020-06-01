import React, { useState, useEffect } from 'react'
import  { Text, ProgressBar, View, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import { useCompare } from '../../helpers/hooks';
import { hexToRgb } from '../../helpers/colors';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPause, faPlay, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

import Visualizer from '../Visualizer';
import Menu from '../menu/index';

import { getCoverArt } from '../../actions/library-actions';
import { pauseSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist, seekSong, getSongArt } from '../../actions/mediaPlayer-actions'

import styles from '../../styles/global'
import np_styles from '../../styles/nowPlaying'

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

const NowPlaying = ({ dispatch, nowPlaying, theme }) => {
    const [ coverArt, setCoverArt ] = useState();
    const [ needToGetSongPalette, setNeedToGetSongPalette ] = useState(true);
    let albumArtHasChanged = useCompare(nowPlaying.activePlaylist ? nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt : coverArt);
    useEffect(() => {
        if(albumArtHasChanged && nowPlaying.activePlaylist && nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt) {
            dispatch(getCoverArt(nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt, setCoverArt));
        }
    }, [albumArtHasChanged, nowPlaying.activePlaylist, nowPlaying.activePlaylistIndex]);
    useEffect(() => {
        if(!needToGetSongPalette || nowPlaying.songPalette) return;
        if(coverArt) {
            dispatch(getSongArt(coverArt.data));
            setNeedToGetSongPalette(false);
        }
    }, [ coverArt, needToGetSongPalette, nowPlaying.songPalette ])

    function onTouchEvent(name, ev) {
        //element is set to 350 width
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        
        var percentDuration = ev.nativeEvent.locationX / 350
        var seekValue = percentDuration * song.duration;

        dispatch(seekSong(seekValue));
    }
    let { width, height } = Dimensions.get('window');
    if(!nowPlaying || nowPlaying.activePlaylist.length === 0) 
        return (
            <View style={[styles.background4, styles.container, styles.centeredcontainer]}>
                <View style={np_styles.fs_visualizer}><Visualizer /></View>
                <View style={{ position: 'absolute', top: 0, left: 0}} >
                    <Menu collapsible={true} width={250} useThemeBackground={true} />
                </View>
            </View>);
    let uri = coverArt ? coverArt.data : null;
    var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
    var seekProgress = (nowPlaying.songSeek / song.duration);
    let backgroundRGB = hexToRgb(theme.background);
    let textBackgroundColor = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.33)`;
    let trackBackgroundColor = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.64)`;

    return (
        <View style={[np_styles.fs_main, {width: width, height: height}]}> 
            <View style={np_styles.fs_visualizer}><Visualizer /></View>
            <View style={{ position: 'absolute', top: 0, left: 0}} >
                <Menu collapsible={true} width={250} useThemeBackground={true} />
            </View>
            <View style={[np_styles.fs_mediaSection, styles.centeredcontainer, { backgroundColor: textBackgroundColor }]} >
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
                        color={theme.first}
                        trackColor={trackBackgroundColor}
                        progress={seekProgress}
                    />
                </View>
                <Text numberOfLines={1} style={[{color: theme.foreground}, np_styles.fs_songText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].title}</Text>
                <Text numberOfLines={1} style={[{color: theme.foreground}, np_styles.fs_artistText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].artist}</Text>
                <View style={{flexDirection: 'row', paddingTop: 10}}>
                    <TouchableWithoutFeedback onPress={() => dispatch(playPreviousSongInPlaylist())}>
                        <FontAwesomeIcon icon={ faStepBackward } size={ 24 } style={{ paddingTop: 3, paddingHorizontal: 15, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(pauseSongInPlaylist())}>
                        <FontAwesomeIcon icon={ !nowPlaying.isPlaying ? faPause : faPlay } size={ 24 } style={{ paddingTop: 3, paddingHorizontal: 15, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(playNextSongInPlaylist())}>
                        <FontAwesomeIcon icon={ faStepForward } size={ 24 } style={{ paddingTop: 3, paddingHorizontal: 15, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </View>);
    
}

export default connect(mapStateToProps)(withTheme(NowPlaying))