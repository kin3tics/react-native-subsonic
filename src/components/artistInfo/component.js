import React, { Component } from 'react'
import  { Text, View, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground, Image} from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import { hexToRgb } from '../../helpers/colors';

import styles from '../../styles/global'
import a_styles from '../../styles/artists'

import {
    TOPSONG_TYPE,
    playSelectedArtistTopSongs,
    addSelectedSongToPlaylist, 
    getSelectedArtistFromServer 
} from '../../actions/library-actions'

import { getDurationArray } from '../../helpers/audio-helper'

const mapStateToProps = state => ({
    server: state.server,
    artist: state.library.selectedArtist,
    artistInfo: state.library.selectedArtistInfo,
    topSongs: state.library.selectedArtistTopSongs
})

const getItemLayout = (data, index) => (
    { length: data.length, offset: 25 * index, index }
)

const ArtistInfo = ({ dispatch, artist, artistInfo, topSongs, width, height, theme }) => {
    let windowWidth = width;
    let windowHeight = height;
    if(!artist || !artistInfo) 
        return (
            <View style={[{width: windowWidth}]}> 
            </View>);
    let backgroundRGB = hexToRgb(theme.background);
    let backgroundColorImage = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.2)`;
    let textBackgroundColor = `rgba(${backgroundRGB.r}, ${backgroundRGB.g}, ${backgroundRGB.b}, 0.64)`;

    let backgroundImageUrl = artistInfo.largeImageUrl ? artistInfo.largeImageUrl
            : artistInfo.mediumImageUrl ? artistInfo.mediumImageUrl
            : artistInfo.smallImageUrl ? artistInfo.smallImageUrl 
            : null;

    let similarArtists = artistInfo.similarArtist ? artistInfo.similarArtist.map((item) => {
        return (
            <View key={item.id}><TouchableWithoutFeedback
                onPress={() => dispatch(getSelectedArtistFromServer(item.id))}>
                <View style={[a_styles.similarArtist, { backgroundColor: textBackgroundColor, borderColor: theme.background}]}><Text style={[a_styles.listItem2, { color: theme.foreground }]}>{item.name}</Text></View>
            </TouchableWithoutFeedback></View>)
    }) : [];
    


    return (
        <View style={[{width: windowWidth}]}> 
            <ImageBackground style={{ height: windowHeight, width:windowWidth }}
                blurRadius={5}
                source={{ uri: backgroundImageUrl }}>
                
                <View style={{backgroundColor: backgroundColorImage, width: windowWidth, height: windowHeight}}>
                    <Text style={[a_styles.albumDetailTitle, { color: theme.first }]}>{artist.name}</Text>
                    <View style={[a_styles.albumDetailText, { padding: 10, marginHorizontal: 30, backgroundColor: textBackgroundColor, borderRadius: 5 }]}>
                        <Text style={{ color: theme.foreground }}>{artistInfo.biography}</Text>
                    </View>
                    <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Similar Artists</Text>
                    <ScrollView style={[{ width: windowWidth, maxHeight: 105 }]}>
                        <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30 }]}>
                            {similarArtists}
                        </View>
                    </ScrollView>
                    <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Top Songs</Text>
                    <ScrollView
                        style={{ paddingHorizontal: 10, paddingVertical: 5, marginHorizontal: 30, marginBottom: 5, backgroundColor: textBackgroundColor, borderRadius: 5 }}>
                        <FlatList
                            data={topSongs}
                            getItemLayout = {getItemLayout}
                            renderItem={({item, index}) => {
                                let songDuration = getDurationArray(item.duration);
                                let borderRadius = {};
                                if(index === 0) {
                                    borderRadius.borderTopLeftRadius = 5;
                                    borderRadius.borderTopRightRadius = 5;
                                } else if (index === topSongs.length - 1) {
                                    borderRadius.borderBottomLeftRadius = 5;
                                    borderRadius.borderBottomRightRadius = 5;
                                    borderRadius.marginBottom = 5;
                                }
                                return (
                                    <View
                                        style={[{ flexDirection:'row', paddingVertical: 5 }]}>
                                        <TouchableWithoutFeedback
                                            onPress={() => dispatch(playSelectedArtistTopSongs(index))}>
                                            <View style={{ flexDirection:'row' }}>
                                                <Text style={{ color: theme.foreground }}>{item.title}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <TouchableWithoutFeedback
                                            onPress={() => dispatch(addSelectedSongToPlaylist(TOPSONG_TYPE, index))}>
                                            <View style={[a_styles.songDuration, { right: 10 }]}>
                                                <Text style={{ color: theme.foreground }}>{songDuration[0]}:{songDuration[1]} | </Text>
                                                <Image style={{height:20,width:20}} source={require('../../images/av/ic_playlist_add_white_24dp.png')}/>
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

export default connect(mapStateToProps)(withTheme(ArtistInfo))