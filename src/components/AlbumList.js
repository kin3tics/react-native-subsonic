import React, { Component } from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, ImageBackground} from 'react-native'
import { connect } from 'react-redux';

import { generateUrlwithId } from '../helpers/api-helper'


import styles from '../styles/global'
import a_styles from '../styles/artists'

import { getSelectedAlbumFromServer } from '../actions/library-actions'

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

const mapStateToProps = state => ({
    server: state.server,
    artist: state.library.selectedArtist
})


class AlbumList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dispatch, artist, server, width } = this.props;
        if(!artist || !artist.album || artist.album.length == 0) 
            return (
                <View style={[a_styles.albumList, styles.background3, {width: width}]}>  
                </View>);
        return (
            <View 
                style={[a_styles.albumList, styles.background3, {width: width}]}>
                    <FlatList 
                        data={artist.album}
                        renderItem = {({item, index}) => 
                            {
                            if(!item.coverArt) {
                                return (
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(getSelectedAlbumFromServer(item.id))}>
                                <View style={[a_styles.albumListItem, getColorForMissingArtwork(index)]}>
                                    <Text style={{color:'#FFF', padding: 5}}>{item.name}</Text>
                                </View>
                                </TouchableWithoutFeedback>)
                            }
                                
                            return(
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(getSelectedAlbumFromServer(item.id))}>
                            <View style={a_styles.albumListItem}>
                                <ImageBackground style={{ height:125, width:125
                                }}
                                source={{ uri: generateUrlwithId(server, 'getCoverArt', item.coverArt)}}>
                                </ImageBackground>
                            </View>
                            </TouchableWithoutFeedback>)}
                        }
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                    />
            </View>);
    }
}

export default connect(mapStateToProps)(AlbumList)