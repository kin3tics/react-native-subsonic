import React from 'react'
import  { Text, View } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import AlbumTile from '../albumTile';

import a_styles from '../../styles/artists'

import { getColorForMissingArtwork } from '../../helpers/colors';

import { getSelectedAlbumFromServer, getSelectedArtistFromServer} from '../../actions/library-actions'
import {
    MENU_LIBRARY,
    setMenu
 } from '../../actions/menu-actions'


const mapStateToProps = state => ({
    searchResults: state.library.searchResults
})

const SearchAlbums = ({ dispatch, searchResults, width, theme }) => {
    let windowWidth = width;

    let albumsExist = (searchResults && searchResults.album && searchResults.album.length > 0);
    let albums = albumsExist ? searchResults.album.map((item, index) => {
        return (<AlbumTile
            key={item.id}
            album={item}
            color={theme.foreground}
            backgroundColor={ getColorForMissingArtwork(index, theme) } 
            onPress={() => {
                dispatch(setMenu(MENU_LIBRARY));
                dispatch(getSelectedArtistFromServer(item.artistId));
                dispatch(getSelectedAlbumFromServer(item.id))}
                } />)
        }) 
        : []

    if (!albumsExist)
        return (<View>
            <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Albums</Text>
            <Text style={{paddingLeft: 30, color: theme.foreground }}>No Albums Found.</Text>
        </View>)

    return (<View>
        <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Albums</Text>
        <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30}]}>
            {albums}
        </View>
    </View>)
}

export default connect(mapStateToProps)(withTheme(SearchAlbums));