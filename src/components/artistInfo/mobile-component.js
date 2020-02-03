import React, { Component } from 'react'
import  { Text, View, ScrollView, Dimensions, TouchableWithoutFeedback, FlatList, ImageBackground, Image} from 'react-native'
import { connect } from 'react-redux';

import AlbumList from '../Library/AlbumList'

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

class ArtistInfo_mobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showArtistInfo: false
        }
    }

    showArtistInfo() {
        this.setState({showArtistInfo: !this.state.showArtistInfo});
    }

    render() {
        let { dispatch, artist, artistInfo, topSongs, width, height } = this.props;
        let windowWidth = width;
        let windowHeight = height;
        if(!artist || !artistInfo) 
            return (
                <View style={[{width: windowWidth}]}> 
                </View>);

        let artistInfoView = this.state.showArtistInfo 
            ? (<View style={[a_styles.albumDetailText, {paddingLeft: 30, paddingRight: 30}]}>
                    <Text style={[styles.font1]}>{artistInfo.biography}</Text>
                </View>) 
            : null;

        let backgroundImageUrl = artistInfo.largeImageUrl ? artistInfo.largeImageUrl
                : artistInfo.mediumImageUrl ? artistInfo.mediumImageUrl
                : artistInfo.smallImageUrl ? artistInfo.smallImageUrl 
                : null;

        let similarArtists = artistInfo.similarArtist ? artistInfo.similarArtist.map((item) => {
            return (
                <View><TouchableWithoutFeedback
                    onPress={() => dispatch(getSelectedArtistFromServer(item.id))}>
                    <View style={a_styles.similarArtist}><Text style={[styles.font1, a_styles.listItem2]}>{item.name}</Text></View>
                </TouchableWithoutFeedback></View>)
        }) : [];

        let topSongsView = (topSongs && topSongs.length > 0)
            ? (<View>
                <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Top Songs</Text>
                <FlatList
                        data={topSongs}
                        getItemLayout = {getItemLayout}
                        renderItem={({item, index}) => {
                            let songDuration = getDurationArray(item.duration);
                            return (
                                <View
                                    style={[{flexDirection:'row'}, a_styles.albumSong]}>
                                    <TouchableWithoutFeedback
                                        onPress={() => dispatch(playSelectedArtistTopSongs(index))}>
                                        <View style={{flexDirection:'row'}}>
                                            <Text style={[styles.font1, {paddingLeft: 30}]}>{item.title}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <TouchableWithoutFeedback
                                        onPress={() => dispatch(addSelectedSongToPlaylist(TOPSONG_TYPE, index))}>
                                        <View style={a_styles.songDuration}>
                                            <Text style={styles.font1}>{songDuration[0]}:{songDuration[1]} | </Text>
                                            <Image style={{height:20,width:20}} source={require('../../images/av/ic_playlist_add_white_24dp.png')}/>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        }}
                        keyExtractor={(item) => item.id}
                    />
            </View>)
            : <View/>;
        
        return (
            <View style={{ height: windowHeight, width:windowWidth }}> 
                <ImageBackground style={{ height: windowHeight, width:windowWidth }}
                    blurRadius={5}
                    source={{ uri: backgroundImageUrl }}>
                    <View style={{backgroundColor: 'rgba(16, 12, 12, 0.64)', width: windowWidth, height: windowHeight}}>
                        <View style={{flexDirection: 'row'}}>
                            <Text numberOfLines={1} style={[styles.font1, a_styles.albumDetailTitle]}>{artist.name}</Text>
                            <TouchableWithoutFeedback
                                onPress={() => this.showArtistInfo()}>
                                <Image style={{height:20,width:20, marginTop: 12}} source={require('../../images/action/baseline_info_white_24dp.png')}/>
                            </TouchableWithoutFeedback>
                        </View>
                        {artistInfoView}
                        <ScrollView 
                                style={[{width: windowWidth, height: windowHeight - 20, paddingBottom: 30}]}>
                            <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Albums</Text>
                            <AlbumList width={windowWidth} />
                            {topSongsView}
                            <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Similar Artists</Text>
                            <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30}]}>
                                {similarArtists}
                            </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>);
    }
}

export default connect(mapStateToProps)(ArtistInfo_mobile)