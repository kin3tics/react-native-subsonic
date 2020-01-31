import React from 'react'
import  { View, ScrollView, Text } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';

import AlbumList from '../albumList'
import AlbumDetails from '../Library/AlbumDetail'
import ArtistInfo from '../artistInfo';

import styles from '../../styles/global'
import a_styles from '../../styles/artists'

const mapStateToProps = state => ({
    artist: state.library.selectedArtist,
    album: state.library.selectedAlbum
})

const ArtistDetail = ({ artist, album, width, height, isMobile, theme }) => {
        let detailHeight = isMobile ? height : (height - 200);
        if(!artist || !artist.album || artist.album.length == 0) 
            return (<ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
                style={[styles.background1, a_styles.container, {width: width}]}>
                <View style={{height: height}}>
                </View>
                <AlbumList width={width} />
            </ScrollView>);
        let detailView = !album 
            ? <ArtistInfo isMobile={isMobile} width={width} height={detailHeight} /> 
            : <AlbumDetails width={width} height={detailHeight}/>
        let albumList = !isMobile
                ? (<View style={[a_styles.albumList, { height: 200, width: width, backgroundColor: theme.background }]}>  
                        <Text style={[a_styles.albumDetailSubtitle, { color: theme.first }]}>Albums</Text>
                        <AlbumList width={width}/>
                    </View>)
                : (null)
        return (
            <ScrollView contentContainerStyle={{ 
                    flexGrow: 1, 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'}}
                    style={[a_styles.container, { width: width, height: height }]}>
                <View style={{height: (detailHeight)}}>
                    {detailView}
                </View>
                {albumList}
            </ScrollView>);
    }

export default connect(mapStateToProps)(withTheme(ArtistDetail))