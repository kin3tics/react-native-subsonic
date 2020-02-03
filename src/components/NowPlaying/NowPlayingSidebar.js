import React, { useEffect, useState } from 'react'
import  { Text, ProgressBar, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';
import DraggableFlatList from '../SortableFlatList'
import { withTheme } from '../../themeProvider';
import { useCompare } from '../../helpers/hooks';
import { getDurationArray } from '../../helpers/audio-helper';
import { getCoverArt } from '../../actions/library-actions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPause, faPlay, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons';

import { pauseSongInPlaylist, playSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist, seekSong, setNewPlaylistOrder } from '../../actions/mediaPlayer-actions'

import styles from '../../styles/global'
import np_styles from '../../styles/nowPlaying'

const mapStateToProps = state => ({
    nowPlaying: state.mediaPlayer
})

const NowPlayingSidebar = ({ dispatch, nowPlaying, theme }) => {
    const [ coverArt, setCoverArt ] = useState();
    let albumArtHasChanged = useCompare(nowPlaying.activePlaylist ? nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt : coverArt);
    useEffect(() => {
        if(albumArtHasChanged && nowPlaying.activePlaylist && nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt)
            dispatch(getCoverArt(nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt, setCoverArt)); 
    }, [albumArtHasChanged, nowPlaying.activePlaylist, nowPlaying.activePlaylistIndex, dispatch])

    function getItemLayout(data, index) { return { length: data.length, offset: 15 * index, index }; }
    function onTouchEvent(name, ev) {
        //element is set to 150 width
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        
        var percentDuration = ev.nativeEvent.locationX / 150
        var seekValue = percentDuration * song.duration;
    
        dispatch(seekSong(seekValue));
    }

    let { height } = Dimensions.get('window')
    if(!nowPlaying || nowPlaying.activePlaylist.length === 0) 
        return(<View />);
    var uri = coverArt ? coverArt.data : null;
    let headerBackgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.05)';
    let playlistBackgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,.03)';
    var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
    var seekProgress = (nowPlaying.songSeek / song.duration);
    return (
        <View style={[np_styles.nowPlaying, { height: height, backgroundColor: headerBackgroundColor }]}> 
            <View style={[np_styles.mediaSection, styles.centeredcontainer]} >
                <Image 
                    source={{ uri: uri}}
                    style={{height: 150, width: 150}} />
                <View style={np_styles.progressBar}
                    onStartShouldSetResponder={(ev) => true}
                    onResponderGrant={onTouchEvent.bind(this, "onResponderGrant")}
                    onResponderMove={onTouchEvent.bind(this, "onResponderMove")}
                    >
                    <ProgressBar
                        style={{borderRadius: 10}}
                        color={theme.first}
                        trackColor={theme.background}
                        progress={seekProgress}
                    />
                </View>
                <Text numberOfLines={1} style={[np_styles.songText, { color: theme.foreground }]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].title}</Text>
                <Text numberOfLines={1} style={[np_styles.artistText, { color: theme.foreground }]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].artist}</Text>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <TouchableWithoutFeedback onPress={() => dispatch(playPreviousSongInPlaylist())}>
                    <FontAwesomeIcon icon={ faStepBackward } size={ 12 } style={{ paddingTop: 3, paddingHorizontal: 5, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(pauseSongInPlaylist())}>
                        <FontAwesomeIcon icon={ !nowPlaying.isPlaying ? faPause : faPlay } size={ 12 } style={{ paddingTop: 3, paddingHorizontal: 5, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(playNextSongInPlaylist())}>
                        <FontAwesomeIcon icon={ faStepForward } size={ 12 } style={{ paddingTop: 3, paddingHorizontal: 5, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={[np_styles.playlistSection, { backgroundColor: playlistBackgroundColor }]}>
                <View style={[{padding: 10}, styles.centeredcontainer]}>
                    <Text style={[np_styles.playlistHeader, { color: theme.first }]}>Now Playing</Text>
                </View>
                <ScrollView
                    style={{height: height-330}}
                >

                <DraggableFlatList
                    data={nowPlaying.activePlaylist}
                    getItemLayout={getItemLayout}
                    renderItem={({ item, index, move, moveEnd }) => {
                        let itemColor = item.isActive ? theme.first : theme.foreground;
                    
                        let songDuration = getDurationArray(item.duration);
                        return (
                            <TouchableWithoutFeedback 
                                onPress={() => dispatch(playSongInPlaylist(index))}
                                onLongPress={move}
                                onPressOut={moveEnd}
                                >
                                <View style={[{flexDirection:'row', padding: 2}]}>
                                    <View style={{width: 190}}>
                                        <Text numberOfLines={1} style={{ color: itemColor, paddingLeft: 10 }}>{item.title} - {item.artist}</Text>
                                    </View>
                                    <View style={{width: 60, paddingRight: 10}} >
                                        <Text style={[{ color: itemColor, textAlign:'right' }]}>{songDuration[0]}:{songDuration[1]}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                    keyExtractor={(item, index) => `draggable-item-${item.id}-${index}`}
                    scrollPercent={5}
                    onMoveEnd={({ data }) => dispatch(setNewPlaylistOrder(data))}
                    extraData={nowPlaying.activePlaylistIndex}
                />
                
                </ScrollView>
            </View>
            <View style={[np_styles.playlistTrackCount, { backgroundColor: playlistBackgroundColor }]}>
                <Text style={{ color: theme.foreground }}>{nowPlaying.activePlaylist.length} Tracks</Text>
            </View>
        </View>);
}

export default connect(mapStateToProps)(withTheme(NowPlayingSidebar))