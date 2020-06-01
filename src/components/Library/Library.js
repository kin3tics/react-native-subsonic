import React from 'react'
import  { Text, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';

import { getColorForMissingArtwork } from '../../helpers/colors';

import AlbumComponent from '../albumTile';
import ArtistDetail from '../artistDetail';

import a_styles from '../../styles/artists'

import {
    RANDOM_TYPE,
    RECENTADD_TYPE,
    PINNED_TYPE,
    MOSTPLAYED_TYPE,
    RECENTPLAYED_TYPE,
    setLibraryAlbumListType,
    getAlbumList,
    getSelectedArtistFromServer,
    getSelectedAlbumFromServer
} from '../../actions/library-actions'

const mapStateToProps = state => ({
    artist: state.library.selectedArtist,
    albumListType: state.library.libraryAlbumListType,
    albumList: state.library.libraryAlbumList
})



const LibraryComponent = ({ dispatch, artist, albumListType, albumList, height, width, isMobile, theme }) => {
    const typeArray = [RANDOM_TYPE, RECENTADD_TYPE, PINNED_TYPE, MOSTPLAYED_TYPE, RECENTPLAYED_TYPE];
    if(artist) { return (<ArtistDetail height={height} width={width} isMobile={isMobile} />)}
    let windowWidth = width;
    let paddingStyle = isMobile ? a_styles.mobileLibraryPadding : a_styles.libraryPadding;

    let types = typeArray.map((item, i) => {
        let text = (item == albumListType)
            ? <Text style={[a_styles.libraryListItemSelected, { color: theme.foreground }]}>{item}</Text>
            : <Text style={[a_styles.libraryListItem, { color: theme.foreground }]}>{item}</Text>
        return (
            <View key={`library.item.${i}`}><TouchableWithoutFeedback
                onPress={() => {
                    if(item !== albumListType) {
                        dispatch(setLibraryAlbumListType(item))
                        dispatch(getAlbumList(item, null, 50, 0))
                    }
                    }}>
                <View style={a_styles.libraryTypes}>{text}</View>
            </TouchableWithoutFeedback></View>)
    });

    const onAlbumPress = (album) => {
        dispatch(getSelectedArtistFromServer(album.artistId))
        dispatch(getSelectedAlbumFromServer(album.id))
    }

    let albums = albumList.map((item, index) => (
        <AlbumComponent 
            key={item.id}
            album={item} 
            color={theme.foreground}
            backgroundColor={getColorForMissingArtwork(index, theme)}
            onPress={onAlbumPress} />
    ));

    return (
        <View style={[{width: windowWidth, height: height, paddingBottom: 15}]}> 
            <Text style={[a_styles.albumDetailTitle, paddingStyle, { color: theme.foreground }]}>Library</Text>
            <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start"}, paddingStyle]}>
                {types}
            </View>
            <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: "center",
                flexWrap: 'wrap',
                paddingHorizontal: 15}}
                style={[{width: windowWidth, height: height}]}>
                    {albums}
            </ScrollView>
        </View>);
}

export default connect(mapStateToProps)(withTheme(LibraryComponent))