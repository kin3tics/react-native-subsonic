import React, {Component} from 'react'
import  { Text, View, FlatList, ScrollView, Dimensions, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import { connect } from 'react-redux';

import ArtistDetail from './ArtistDetail'

import styles from '../styles/global'
import a_styles from '../styles/artists'

import {
    RANDOM_TYPE,
    RECENTADD_TYPE,
    PINNED_TYPE,
    MOSTPLAYED_TYPE,
    RECENTPLAYED_TYPE,
    GENRE_TYPE,
    setLibraryAlbumListType,
    getAlbumList,
    getSelectedArtistFromServer,
    getSelectedAlbumFromServer
} from '../actions/library-actions'

import { generateUrlwithId } from '../helpers/api-helper'

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
    artist: state.library.selectedArtist,
    albumListType: state.library.libraryAlbumListType,
    albumList: state.library.libraryAlbumList
})


class Library extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeArray: [RANDOM_TYPE, RECENTADD_TYPE, PINNED_TYPE, MOSTPLAYED_TYPE, RECENTPLAYED_TYPE]
        }
    }

    componentWillMount() {
        let {dispatch, albumListType} = this.props;
        if(!albumListType)
        {
            dispatch(setLibraryAlbumListType(this.state.typeArray[0]))
            dispatch(getAlbumList(this.state.typeArray[0], null, 50, 0))
        } else {
            dispatch(getAlbumList(albumListType, null, 50, 0))
        }
    }

    render() {
        let {dispatch, server, artist, albumListType, albumList, height, width} = this.props;
        if(artist) { return (<ArtistDetail height={height} width={width} />)}
        let windowWidth = width;

        let types = this.state.typeArray.map((item) => {
            let text = (item == albumListType)
                ? <Text style={[styles.font1, a_styles.libraryListItemSelected]}>{item}</Text>
                : <Text style={[styles.font1, a_styles.libraryListItem]}>{item}</Text>
            return (
                <View><TouchableWithoutFeedback
                    onPress={() => {
                        dispatch(setLibraryAlbumListType(item))
                        dispatch(getAlbumList(item, null, 50, 0))
                        }}>
                    <View style={a_styles.libraryTypes}>{text}</View>
                </TouchableWithoutFeedback></View>)
        });

        let albums = albumList.map((item, index) => {
            if(!item.coverArt) {
                return (
                <TouchableWithoutFeedback
                    onPress={() => {
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
        })

        return (
            <View style={[{width: windowWidth, height: height}]}> 
                <Text style={[styles.font1, a_styles.albumDetailTitle, {paddingLeft: 30}]}>Library</Text>
                <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30}]}>
                    {types}
                </View>
                <ScrollView contentContainerStyle={{ 
                    flexGrow: 1, 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    alignItems: "flex-start",
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap'}}
                    style={[{width: windowWidth}, { paddingLeft: 30, paddingRight: 30}]}>
                        {albums}
                </ScrollView>
            </View>);
        }
}

export default connect(mapStateToProps)(Library)