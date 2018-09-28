import React, {Component} from 'react'
import  { Text, View, Dimensions, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import a_styles from '../styles/artists'

import { getSelectedAlbumFromServer, getSelectedArtistFromServer} from '../actions/library-actions'
import {
    MENU_LIBRARY,
    setMenu
 } from '../actions/menu-actions'

import { generateUrlwithId } from '../helpers/api-helper'


const mapStateToProps = state => ({
    server: state.server,
    searchText: state.library.searchQuery,
    searchResults: state.library.searchResults
})

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

class SearchAlbums extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }


    render() {
        let { dispatch, server, searchResults, width } = this.props
        let windowWidth = width;

        let albumsExist = (searchResults && searchResults.album && searchResults.album.length > 0);
        let albums = albumsExist ? searchResults.album.map((item, index) => {
            if(!item.coverArt) {
                return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        dispatch(setMenu(MENU_LIBRARY))
                        dispatch(getSelectedArtistFromServer(item.artistId))
                        dispatch(getSelectedAlbumFromServer(item.id))
                    }}>
                <View style={[a_styles.albumListItem, getColorForMissingArtwork(index)]}>
                    <Text style={{color:'#FFF', padding: 5}}>{item.name}</Text>
                </View>
                </TouchableWithoutFeedback>)
            }
                
            return(
                <TouchableWithoutFeedback
                    onPress={() => {
                        dispatch(setMenu(MENU_LIBRARY))
                        dispatch(getSelectedArtistFromServer(item.artistId))
                        dispatch(getSelectedAlbumFromServer(item.id))
                    }}>
                <View style={a_styles.albumListItem}>
                    <ImageBackground style={{ height:125, width:125
                    }}
                    source={{ uri: generateUrlwithId(server, 'getCoverArt', item.coverArt)}}>
                    </ImageBackground>
                </View>
                </TouchableWithoutFeedback>)
            }) : []

        if (!albumsExist)
            return (<View>
                <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Albums</Text>
                <Text style={[styles.font1, {paddingLeft: 30}]}>No Albums Found.</Text>
            </View>)

        return (<View>
            <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Albums</Text>
            <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30}]}>
                {albums}
            </View>
        </View>)
        }
}

export default connect(mapStateToProps)(SearchAlbums)