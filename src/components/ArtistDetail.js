import React from 'react'
import  { Text, View, Dimensions, ScrollView} from 'react-native'
import { connect } from 'react-redux';

import AlbumList from './AlbumList'
import AlbumDetails from './AlbumDetail'

import styles from '../styles/global'
import a_styles from '../styles/artists'

const mapStateToProps = state => ({
    server: state.server,
    artist: state.library.selectedArtist
})



const ArtistDetail = ({ dispatch, artist, server }) => {
    let {width, height} = Dimensions.get('window')
    if(!artist || !artist.album || artist.album.length == 0) 
        return (<ScrollView contentContainerStyle={{ 
            flexGrow: 1, 
            flexDirection: 'column', 
            justifyContent: 'space-between'}}
            style={[styles.background1, a_styles.container, {width: width - 500}]}>
            <View style={{height: (height)}}>
            </View>
            <AlbumList />
        </ScrollView>);
    return (
        <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
             style={[styles.background1, a_styles.container, {width: width - 500}]}>
            <View style={{height: (height)}}>
                <AlbumDetails/>
            </View>
                <AlbumList/>
        </ScrollView>);
}

export default connect(mapStateToProps)(ArtistDetail)