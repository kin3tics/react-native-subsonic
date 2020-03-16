import React, { useState, useEffect } from 'react'
import  { Text, View, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground, Image} from 'react-native';
import { connect } from 'react-redux';
import { useCompare } from '../../helpers/hooks';
import { hexToRgb } from '../../helpers/colors';
import { withTheme } from '../../themeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle, faRandom } from '@fortawesome/free-solid-svg-icons';

import { getSubsonicInstance } from '../../helpers/api-helper'

import a_styles from '../../styles/artists'

import { PLAYLIST_TYPE, playSelectedPlaylist, addSelectedSongToPlaylist, getCoverArt } from '../../actions/library-actions'

import { getDurationArray } from '../../helpers/audio-helper'

const mapStateToProps = state => ({
    server: state.server,
    playlist: state.library.selectedPlaylist
})

const getItemLayout = (data, index) => (
    { length: data.length, offset: 25 * index, index }
)

const PlaylistDetail = ({ dispatch, playlist, width, height, server, theme }) => {
    const [ coverArt, setCoverArt ] = useState();
    let playlistArtHasChanged = useCompare(playlist.coverArt);
    useEffect(() => {
        if(playlistArtHasChanged && playlist.coverArt)
            dispatch(getCoverArt(playlist.coverArt, setCoverArt));
    });

    let windowWidth = width;
    let windowHeight = height;
    if(!playlist) 
        return (<View style={[{width: windowWidth}]}></View>);

    let playlistDuration = getDurationArray(playlist.duration);
    let songIndexWidth = playlist.songCount > 1000
            ? 55
            : playlist.songCount > 100
                ? 45
                : 35;

    let backgroundRGB = hexToRgb(theme.background);
    let backgroundColorImage = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.2)`;
    let textBackgroundColor = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.64)`;
    
    return (
        <View style={[{width: windowWidth}]}> 
            <ImageBackground style={{ height: windowHeight, width:windowWidth }}
                blurRadius={5}
                source={{ uri: getSubsonicInstance(server).media.getCoverArt(playlist.coverArt)}}>
                
                <View style={{backgroundColor: backgroundColorImage, width: windowWidth, height: windowHeight}}>
                    <View style={{ backgroundColor: textBackgroundColor }}>
                        <Text style={[a_styles.albumDetailTitle, { color: theme.first }]}>{playlist.name}</Text>
                        <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>{playlist.comment}</Text>
                        <View style={[a_styles.albumDetailText, { marginBottom: 10 }]}>
                            <Text style={{ color: theme.foreground }}>{playlist.songCount} Tracks | </Text>
                            <Text style={{ color: theme.foreground }}>{playlistDuration[0]}:{playlistDuration[1]} | </Text>
                            <TouchableWithoutFeedback onPress={() => dispatch(playSelectedPlaylist(0))}>
                                <FontAwesomeIcon icon={ faPlayCircle } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                            </TouchableWithoutFeedback>
                            <Text style={{ color: theme.foreground }}> | </Text>
                            <TouchableWithoutFeedback onPress={() => dispatch(playSelectedPlaylist(0, true))}>
                                <FontAwesomeIcon icon={ faRandom } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                            </TouchableWithoutFeedback>
                            {/* <Text style={{ color: theme.foreground }}> | </Text>
                            <TouchableWithoutFeedback onPress={() => dispatch(addSelectedPlaylistToPlaylist())}>
                                <Image style={{height:20,width:20}} source={require('../images/av/ic_queue_music_white_24dp.png')}/>
                            </TouchableWithoutFeedback> */}
                        </View>
                    </View>
                    <ScrollView style={[a_styles.albumSongContainer, {width: windowWidth - 50, height: windowHeight - 150, backgroundColor: textBackgroundColor, borderRadius: 5 }]}>
                        <FlatList
                            data={playlist.entry}
                            getItemLayout={getItemLayout}
                            renderItem={({item, index}) => {
                                let songDuration = getDurationArray(item.duration);
                                return (
                                    <View
                                        style={[{flexDirection:'row'}, a_styles.albumSong]}>
                                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedPlaylist(index, false))}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{ paddingLeft: 10, width:songIndexWidth, color: theme.foreground }}>{index + 1}.</Text>
                                                <Text style={{ paddingLeft: 15, color: theme.foreground }}>{item.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => dispatch(addSelectedSongToPlaylist(PLAYLIST_TYPE, index))}>
                                            <View style={[a_styles.songDuration, { right: 10 }]}>
                                                <Text style={{ color: theme.foreground }}>{songDuration[0]}:{songDuration[1]} | </Text>
                                                <Image style={{height:20,width:20}} source={require('../../images/av/ic_playlist_add_white_24dp.png')}/>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => item.id + '-' + index}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>);
}

export default connect(mapStateToProps)(withTheme(PlaylistDetail));