import React, {useEffect, useState} from 'react'
import  { Text, View, ScrollView, TouchableWithoutFeedback, ImageBackground} from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import { useCompare } from '../../helpers/hooks'

import ArtistDetail from '../artistDetail';

import a_styles from '../../styles/artists'

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
    getSelectedAlbumFromServer,
    getCoverArt
} from '../../actions/library-actions'

function getColorForMissingArtwork(index, theme) {
    let i = index % 5
    switch(i)
    {
        case 1:
            return theme.first // styles.missingArtworkColor1
        case 2:
            return theme.second // styles.missingArtworkColor2
        case 3:
            return theme.third // styles.missingArtworkColor3
        case 4:
            return theme.fourth // styles.missingArtworkColor4
        case 0:
        default:
            return theme.fifth // styles.missingArtworkColor5
    }

}

const mapStateToProps = state => ({
    artist: state.library.selectedArtist,
    albumListType: state.library.libraryAlbumListType,
    albumList: state.library.libraryAlbumList
})

const AlbumComponent = connect()(({ album, backgroundColor, color, onPress, dispatch }) => {
    const [ coverArt, setCoverArt ] = useState();
    let albumHasChanged = useCompare(album.id);
    let albumArtHasChanged = useCompare(album.coverArt);
    useEffect(() => {
        if(albumHasChanged)
            setCoverArt(null);
        if(albumArtHasChanged && album.coverArt)
            dispatch(getCoverArt(album.coverArt, setCoverArt)); 
    })
    return (
        <TouchableWithoutFeedback
            onPress={() => onPress(album)}>
        <View style={[a_styles.albumListItem, { backgroundColor: backgroundColor }]}>
            {coverArt 
                ? (<ImageBackground 
                    style={{ height:125, width:125}}
                    source={{ uri: coverArt.data }} />)
                : (<Text style={{color:color, padding: 5}}>{album.name}</Text>)
            }
        </View>
        </TouchableWithoutFeedback>
    );
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
        <View style={[{width: windowWidth, height: height}]}> 
            <Text style={[a_styles.albumDetailTitle, paddingStyle, { color: theme.foreground }]}>Library</Text>
            <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start"}, paddingStyle]}>
                {types}
            </View>
            <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems: "flex-start",
                justifyContent: 'flex-start',
                flexWrap: 'wrap'}}
                style={[{width: windowWidth, height: height}]}>
                    {albums}
            </ScrollView>
        </View>);
}

export default connect(mapStateToProps)(withTheme(LibraryComponent))