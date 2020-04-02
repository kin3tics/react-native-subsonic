import React from 'react'
import  { Text, View, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';

import a_styles from '../../styles/artists'

import { getSelectedArtistFromServer, setSelectedAlbum } from '../../actions/library-actions'
import {
    MENU_LIBRARY,
    setMenu
 } from '../../actions/menu-actions'

const mapStateToProps = state => ({
    searchResults: state.library.searchResults
})

const SearchArtists = ({ dispatch, width, searchResults, theme }) => {
    let windowWidth = width;

    let artistsExist = (searchResults && searchResults.artist)
    let artists = artistsExist ? searchResults.artist.map((item) => {
        return (
            <View><TouchableWithoutFeedback
                onPress={() => {
                    dispatch(setMenu(MENU_LIBRARY));
                    dispatch(getSelectedArtistFromServer(item.id));
                    dispatch(setSelectedAlbum(null));
                }}>
                <View style={a_styles.similarArtist}><Text style={[a_styles.listItem2, { color: theme.foreground }]}>{item.name}</Text></View>
            </TouchableWithoutFeedback></View>)
    }) : [];

    if (!artistsExist)
        return(<View>
            <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Artists</Text>
            <Text style={{paddingLeft: 30, color: theme.foreground}}>No Artists Found.</Text>
        </View>)

    return (
        <View>
            <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Artists</Text>
            <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30}]}>
                {artists}
            </View>
        </View>
    )
}

export default connect(mapStateToProps)(withTheme(SearchArtists))