import React from 'react'
import { Text, View, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import a_styles from '../../styles/artists'

import { playSearchedSong, addSelectedSongToPlaylist } from '../../actions/library-actions'

import { getDurationArray } from '../../helpers/audio-helper'


const mapStateToProps = state => ({
    searchResults: state.library.searchResults
})

const getItemLayout = (data, index) => (
    { length: data.length, offset: 25 * index, index }
)

const SearchSongs = ({ dispatch, searchResults, theme }) => {
    let songsExist = (searchResults && searchResults.song)
    let songs = songsExist ? searchResults.song : [];
    
    if(!songsExist)
        return (<View>
            <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Songs</Text>
            <Text style={{ paddingLeft: 30, color: theme.foreground }}>No Songs Found.</Text>
        </View>)

    return (
        <View>
            <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Songs</Text>
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
                                    <Text numberOfLines={1} style={{paddingLeft: 30, color: theme.foreground}}>{item.title} - {item.artist}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(addSelectedSongToPlaylist('SEARCH', index))}>
                                <View style={a_styles.songDuration}>
                                    <Text style={{ color: theme.foreground }}>{songDuration[0]}:{songDuration[1]} | </Text>
                                    <FontAwesomeIcon icon={ faPlusCircle } size={12} style={{ paddingTop: 3, color: theme.foreground }} />
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

export default connect(mapStateToProps)(withTheme(SearchSongs))