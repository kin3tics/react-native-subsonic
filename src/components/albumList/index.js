import React, { useState, useEffect } from 'react'
import  { Text, View, TouchableWithoutFeedback, FlatList, ImageBackground} from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import AlbumComponent from '../albumTile';

import { getColorForMissingArtwork } from '../../helpers/colors';

import { getSelectedAlbumFromServer, getCoverArt } from '../../actions/library-actions';

const mapStateToProps = state => ({
    server: state.server,
    artist: state.library.selectedArtist
})

const AlbumList = ({ dispatch, artist, theme }) => {
    if(!artist || !artist.album || artist.album.length == 0) 
        return (<View/>);

    return (<FlatList 
            data={artist.album}
            renderItem = {({item, index}) => 
                {
                return (<AlbumComponent 
                    key={item.id}
                    album={item} 
                    color={theme.foreground}
                    backgroundColor={getColorForMissingArtwork(index, theme)}
                    onPress={() => dispatch(getSelectedAlbumFromServer(item.id))} />);
                }
            }
            keyExtractor={(item) => item.id}
            horizontal={true}
        />);
}

export default connect(mapStateToProps)(withTheme(AlbumList))