import React, {Component} from 'react'
import { Text, View, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import a_styles from '../styles/artists'

import {playSearchedSong, addSelectedSongToPlaylist} from '../actions/library-actions'

import { getDurationArray } from '../helpers/audio-helper'


const mapStateToProps = state => ({
    server: state.server,
    searchText: state.library.searchQuery,
    searchResults: state.library.searchResults
})

const getItemLayout = (data, index) => (
    { length: data.length, offset: 25 * index, index }
)

class SearchSongs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        let { dispatch, searchResults } = this.props

        let songsExist = (searchResults && searchResults.song)
        let songs = songsExist ? searchResults.song : [];
        
        if(!songsExist)
            return (<View/>)

        return (
            <View>
                <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Songs</Text>
                <FlatList
                    data={songs}
                    getItemLayout = {getItemLayout}
                    renderItem={({item, index}) => {
                        let songDuration = getDurationArray(item.duration);
                        return (
                            <View
                                style={[{flexDirection:'row'}, a_styles.albumSong]}>
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(playSearchedSong(index))}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={[styles.font1, {paddingLeft: 30}]}>{item.title}</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(addSelectedSongToPlaylist(SEARCH_TYPE, index))}>
                                    <View style={a_styles.songDuration}>
                                        <Text style={styles.font1}>{songDuration[0]}:{songDuration[1]} | </Text>
                                        <Image style={{height:20,width:20}} source={require('../images/av/ic_playlist_add_white_24dp.png')}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => `${item.id}${index}`}
                />
            </View>
        )
    }
}

export default connect(mapStateToProps)(SearchSongs)