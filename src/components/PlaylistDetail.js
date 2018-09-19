import React from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground, Image} from 'react-native'
import { connect } from 'react-redux';

import { generateUrlwithId } from '../helpers/api-helper'


import styles from '../styles/global'
import a_styles from '../styles/artists'

import {PLAYLIST_TYPE, playSelectedPlaylist, addSelectedPlaylistToPlaylist, addSelectedSongToPlaylist } from '../actions/library-actions'

import { getDurationArray } from '../helpers/audio-helper'

const mapStateToProps = state => ({
    server: state.server,
    playlist: state.library.selectedPlaylist
})

const getItemLayout = (data, index) => (
    { length: data.length, offset: 25 * index, index }
)

const PlaylistDetail = ({ dispatch, playlist, server }) => {
    let {width, height} = Dimensions.get('window')
    let windowWidth = width - 500;
    let windowHeight = height;
    if(!playlist) 
        return (
            <View style={[{width: windowWidth}]}> 
            </View>);

    let playlistDuration = getDurationArray(playlist.duration);
    let songIndexWidth = playlist.songCount > 1000
            ? 45
            : playlist.songCount > 100
                ? 35
                : 25;
    return (
        <View style={[{width: windowWidth}]}> 
            <ImageBackground style={{ height: windowHeight, width:windowWidth }}
                blurRadius={5}
                source={{ uri: generateUrlwithId(server, 'getCoverArt', playlist.coverArt)}}>
                
                <View style={{backgroundColor: 'rgba(16, 12, 12, 0.64)', width: windowWidth, height: windowHeight}}>
                    <Text style={[styles.font1, a_styles.albumDetailTitle]}>{playlist.name}</Text>
                    <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>{playlist.comment}</Text>
                    <View style={a_styles.albumDetailText}>
                        <Text style={[styles.font1]}>{playlist.songCount} Tracks | </Text>
                        <Text style={[styles.font1]}>{playlistDuration[0]}:{playlistDuration[1]} | </Text>
                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedPlaylist(0))}>
                            <Image style={{height: 20, width:20}} source={require('../images/av/ic_play_circle_outline_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <Text style={[styles.font1]}> | </Text>
                        <TouchableWithoutFeedback onPress={() => dispatch(playSelectedPlaylist(0, true))}>
                            <Image style={{height: 20, width:20}} source={require('../images/av/ic_shuffle_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <Text style={[styles.font1]}> | </Text>
                        <TouchableWithoutFeedback onPress={() => dispatch(addSelectedPlaylistToPlaylist())}>
                            <Image style={{height:20,width:20}} source={require('../images/av/ic_queue_music_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={[a_styles.albumSongContainer, {width: windowWidth - 50, height: windowHeight - 150}]}>
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
                                                <Text style={[styles.font1, {width:songIndexWidth}]}>{index + 1}.</Text>
                                                <Text style={[styles.font1, {paddingLeft: 15}]}>{item.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback onPress={() => dispatch(addSelectedSongToPlaylist(PLAYLIST_TYPE, index))}>
                                            <View style={a_styles.songDuration}>
                                                <Text style={styles.font1}>{songDuration[0]}:{songDuration[1]} | </Text>
                                                <Image style={{height:20,width:20}} source={require('../images/av/ic_playlist_add_white_24dp.png')}/>
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

export default connect(mapStateToProps)(PlaylistDetail)