import React from 'react'
import  { Text, ProgressBar, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';

import { generateUrlwithId } from '../helpers/api-helper'
import { getDurationArray } from '../helpers/audio-helper'

import { pauseSongInPlaylist, playSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist } from '../actions/mediaPlayer-actions'

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

function onTouchEvent(name, ev) {
    console.log(
        `[${name}] ` + 
        `root_x: ${ev.nativeEvent.pageX}, root_y: ${ev.nativeEvent.pageY} ` +
        `target_x: ${ev.nativeEvent.locationX}, target_y: ${ev.nativeEvent.locationY} ` + 
        `target: ${ev.nativeEvent.target}`
    );
}

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

const NowPlayingSidebar = ({ dispatch, nowPlaying, server }) => {
    let {width, height} = Dimensions.get('window')
    if(!nowPlaying || nowPlaying.activePlaylist.length === 0) 
        return (
            <View style={[np_styles.nowPlaying, styles.background4, {height: height}]}> 
                <View style={[np_styles.mediaSection, styles.background2]} ></View>
            </View>);
    console.log(nowPlaying);
    var uri = generateUrlwithId(server, 'getCoverArt', nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt);
    console.log(uri);
    
    var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
    var playButton = !nowPlaying.isPlaying
            ?(<Image style={{height: 20, width:20}} source={require('../images/av/ic_play_arrow_white_24dp.png')}/>)
            :(<Image style={{height: 20, width:20}} source={require('../images/av/ic_pause_white_24dp.png')}/>);
    var seekProgress = (nowPlaying.songSeek / song.duration);
    return (
        <View style={[np_styles.nowPlaying, styles.background4, {height: height}]}> 
            <View style={[np_styles.mediaSection, styles.centeredcontainer, styles.background2]} >
                <Image 
                    source={{ uri: uri}}
                    style={{height: 150, width: 150}} />
                <Text numberOfLines={1} style={[styles.font1, np_styles.songText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].title}</Text>
                <Text numberOfLines={1} style={[styles.font1, np_styles.artistText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].artist}</Text>
                <View style={np_styles.progressBar}
                    //TODO: Convert NowPlayingSidebar into a class that can be binded
                    //onStartShouldSetResponder={(ev) => true}
                    //onResponderGrant={this.onTouchEvent.bind(this, "onResponderGrant")}
                    //onResponderMove={this.onTouchEvent.bind(this, "onResponderMove")}
                    >
                    <ProgressBar
                        style={{borderRadius: 10}}
                        color={'#DDD'}
                        trackColor={'#343434'}
                        progress={seekProgress}
                    />
                </View>
                <View style={{flexDirection: 'row'}}>
                    <TouchableWithoutFeedback onPress={() => dispatch(playPreviousSongInPlaylist())}>
                        <Image style={{height: 20, width:20}} source={require('../images/av/ic_skip_previous_white_24dp.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(pauseSongInPlaylist())}>
                        {playButton}
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(playNextSongInPlaylist())}>
                        <Image style={{height: 20, width:20}} source={require('../images/av/ic_skip_next_white_24dp.png')}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <View style={[np_styles.playlistSection]}>
                <View style={[{padding: 10}, styles.centeredcontainer]}>
                    <Text style={[styles.font1, np_styles.playlistHeader]}>Now Playing</Text>
                </View>
                <ScrollView
                    style={{height: height-330}}
                >
                <FlatList
                    data={nowPlaying.activePlaylist}
                    renderItem={({item, index}) => {
                        let songDuration = getDurationArray(item.duration);
                        return (
                            <TouchableWithoutFeedback onPress={() => dispatch(playSongInPlaylist(index))}>
                                <View style={[{flexDirection:'row', padding: 2}]}>
                                    <View style={{width: 190}}>
                                        <Text numberOfLines={1} style={[styles.font1, {paddingLeft: 10}]}>{item.title} - {item.artist}</Text>
                                    </View>
                                    <View style={{width: 60, paddingRight: 10}} >
                                        <Text style={[styles.font1,{textAlign:'right'}]}>{songDuration[0]}:{songDuration[1]}</Text>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        )
                    }}
                    keyExtractor={(item) => item.id}
                />
                </ScrollView>
            </View>
            <View style={np_styles.playlistTrackCount}>
                <Text style={styles.font1}>{nowPlaying.activePlaylist.length} Tracks</Text>
            </View>
        </View>);
}

export default connect(mapStateToProps)(NowPlayingSidebar)