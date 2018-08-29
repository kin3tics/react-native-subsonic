import React from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground, Image} from 'react-native'
import { connect } from 'react-redux';

import { generateUrlwithId } from '../helpers/api-helper'


import styles from '../styles/global'
import a_styles from '../styles/artists'

import { ALBUM_TYPE, playSelectedAlbum, addSelectedAlbumToPlaylist, addSelectedSongToPlaylist } from '../actions/library-actions'

import { getDurationArray } from '../helpers/audio-helper'

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

const AlbumDetail = ({ dispatch, album, server }) => {
    let {width, height} = Dimensions.get('window')
    let windowWidth = width - 500;
    let windowHeight = height - 160;
    if(!album) 
        return (
            <View style={[{width: windowWidth}]}> 
            </View>);

    let albumDuration = getDurationArray(album.duration);
    let songIndexWidth = album.songCount > 1000
            ? 45
            : album.songCount > 100
                ? 35
                : 25;
    return (
        <View style={[{width: windowWidth}]}> 
            <ImageBackground style={{ height: windowHeight, width:windowWidth }}
                blurRadius={5}
                source={{ uri: generateUrlwithId(server, 'getCoverArt', album.coverArt)}}>
                
                <View style={{backgroundColor: 'rgba(16, 12, 12, 0.64)', width: windowWidth, height: windowHeight}}>
                    <Text style={[styles.font1, a_styles.albumDetailTitle]}>{album.name}</Text>
                    <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>{album.artist}</Text>
                    <View style={a_styles.albumDetailText}>
                        <Text style={[styles.font1]}>{album.songCount} Tracks | </Text>
                        <Text style={[styles.font1]}>{albumDuration[0]}:{albumDuration[1]} | {album.genre} | </Text>
                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(0, false))}>
                            <Image style={{height: 20, width:20}} source={require('../images/av/ic_play_circle_outline_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <Text style={[styles.font1]}> | </Text>
                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(0, true))}>
                            <Image style={{height: 20, width:20}} source={require('../images/av/ic_shuffle_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <Text style={[styles.font1]}> | </Text>
                        <TouchableWithoutFeedback onPress={() => dispatch(addSelectedAlbumToPlaylist())}>
                            <Image style={{height:20,width:20}} source={require('../images/av/ic_queue_music_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={[a_styles.albumSongContainer, {width: windowWidth - 50, height: windowHeight - 150}]}>
                        <FlatList
                            data={orderAlbumSongs(album).song}
                            renderItem={({item, index}) => {
                                let songDuration = getDurationArray(item.duration);
                                return (
                                    <View
                                        style={[{flexDirection:'row'}, a_styles.albumSong]}>
                                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedAlbum(index, false))}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={[styles.font1, {width:songIndexWidth}]}>{index + 1}.</Text>
                                                <Text style={[styles.font1, {paddingLeft: 15}]}>{item.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => dispatch(addSelectedSongToPlaylist(ALBUM_TYPE, index))}>
                                            <View style={a_styles.songDuration}>
                                                <Text style={styles.font1}>{songDuration[0]}:{songDuration[1]} | </Text>
                                                <Image style={{height:20,width:20}} source={require('../images/av/ic_playlist_add_white_24dp.png')}/>
                                            </View>
                                        </TouchableWithoutFeedback>
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

export default connect(mapStateToProps)(AlbumDetail)