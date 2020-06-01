import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import  { Text, View, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground, Image, StyleSheet } from 'react-native';
import { useCompare } from '../../helpers/hooks';
import { hexToRgb } from '../../helpers/colors';
import { withTheme } from '../../themeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faPlayCircle, faRandom, faPlusCircle, faPlay } from '@fortawesome/free-solid-svg-icons';

import a_styles from '../../styles/artists'

import { 
    ALBUM_TYPE, 
    playSelectedAlbum, 
    addSelectedAlbumToPlaylist, 
    addSelectedSongToPlaylist, 
    setSelectedAlbum ,
    pinSelectedAlbum,
    getCoverArt
} from '../../actions/library-actions'

import { getDurationArray } from '../../helpers/audio-helper'

function orderAlbumSongs (album) {
    album.song.sort(compareSongs);
    return album;
}
function compareSongs (song_a, song_b) {
    //First Compare Disc Numbers
    if (song_a.discNumber === undefined) { song_a.discNumber = 1; }
    if (song_b.discNumber === undefined) { song_b.discNumber = 1; }
    if(song_a.discNumber < song_b.discNumber) {
        return -1;
    }
    if(song_a.discNumber > song_b.discNumber) {
        return 1;
    }
    //Then Compare Track Numbers
    if(song_a.track < song_b.track) {
        return -1;
    }
    if(song_a.track > song_b.track) {
        return 1;
    }
    return 0;
}

const mapStateToProps = state => ({
    server: state.server,
    album: state.library.selectedAlbum
})

const getItemLayout = (data, index) => (
    { length: data.length, offset: 25 * index, index }
)

const AlbumDetail = ({ dispatch, album, width, height, theme }) => {
    const [ albumPinned, setAlbumPinned ] = useState(album.starred ? true : false);
    const [ coverArt, setCoverArt ] = useState();
    let albumHasChanged = useCompare(album.id);
    let albumArtHasChanged = useCompare(album.coverArt);
    useEffect(() => {
        if(albumHasChanged)
            setCoverArt(null);
        if(albumArtHasChanged && album.coverArt)
            dispatch(getCoverArt(album.coverArt, setCoverArt)); 
    }, [albumHasChanged, albumArtHasChanged, album.coverArt, dispatch])
    
    let windowWidth = width;
    let windowHeight = height;
    if(!album) 
        return (
            <View style={[{width: windowWidth}]}> 
            </View>);

    let albumDuration = getDurationArray(album.duration);
    let songIndexWidth = album.songCount > 1000
            ? 55
            : album.songCount > 100
                ? 45
                : 35;

    let backgroundRGB = hexToRgb(theme.background);
    let backgroundColorImage = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.2)`;
    let textBackgroundColor = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.64)`;

    let genreText = album.genre ? `${album.genre} | ` : '';

    return (
        <View style={[{width: windowWidth}]}> 
            <ImageBackground style={{ height: windowHeight, width:windowWidth }}
                blurRadius={5}
                source={{ uri: (coverArt ? coverArt.data : null) }}>
                
                <View style={{backgroundColor: backgroundColorImage, width: windowWidth, height: windowHeight}}>
                    <View style={{ backgroundColor: textBackgroundColor }}>
                        <Text style={[a_styles.albumDetailTitle, { color: theme.first }]}>{album.name}</Text>
                        <TouchableWithoutFeedback
                            onPress={() => dispatch(setSelectedAlbum(null))}>
                            <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>{album.artist}</Text>
                        </TouchableWithoutFeedback>
                        <View style={[a_styles.albumDetailText, { marginBottom: 10 }]}>
                            <TouchableWithoutFeedback
                                onPress={() => { dispatch(pinSelectedAlbum()); setAlbumPinned(!albumPinned) }}>
                                <FontAwesomeIcon icon={ faHeart } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                            </TouchableWithoutFeedback>
                            <Text style={{ color: theme.foreground }}> | {album.songCount} Tracks | {albumDuration[0]}:{albumDuration[1]} | {genreText}</Text>
                            <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(0, false))}>
                                <FontAwesomeIcon icon={ faPlayCircle } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                            </TouchableWithoutFeedback>
                            <Text style={{ color: theme.foreground }}> | </Text>
                            <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(0, true))}>
                                <FontAwesomeIcon icon={ faRandom } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                            </TouchableWithoutFeedback>
                            <Text style={{ color: theme.foreground }}> | </Text>
                            <TouchableWithoutFeedback onPress={() => dispatch(addSelectedAlbumToPlaylist())}>
                                <FontAwesomeIcon icon={ faPlusCircle } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                    <ScrollView style={[a_styles.albumSongContainer, { paddingVertical: 5, width: windowWidth - 50, maxHeight: windowHeight - 150, backgroundColor: textBackgroundColor, borderRadius: 5 }]}>
                        <FlatList
                            data={orderAlbumSongs(album).song}
                            getItemLayout = {getItemLayout}
                            renderItem={({item, index}) => {
                                let songDuration = getDurationArray(item.duration);
                                return (
                                    <View
                                        style={[{flexDirection:'row'}, a_styles.albumSong]}>
                                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(index, false))}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{ paddingLeft: 10, width:songIndexWidth, color: theme.foreground }}>{index + 1}.</Text>
                                                <Text style={{ paddingLeft: 15, color: theme.foreground }}>{item.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <View style={[a_styles.songDuration, { right: 10 }]}>
                                            <Text style={{ color: theme.foreground }}>{songDuration[0]}:{songDuration[1]} | </Text>
                                            <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(index, false))}>
                                                <FontAwesomeIcon icon={ faPlayCircle } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                                            </TouchableWithoutFeedback>
                                            <Text> | </Text>
                                            <TouchableWithoutFeedback onPress={() => dispatch(addSelectedSongToPlaylist(ALBUM_TYPE, index))}>
                                                <FontAwesomeIcon icon={ faPlusCircle } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
                                            </TouchableWithoutFeedback>
                                        </View>
                                    </View>
                                )
                            }}
                            keyExtractor={(item) => item.id}
                        />
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>);
}

export default connect(mapStateToProps)(withTheme(AlbumDetail))