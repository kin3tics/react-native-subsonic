import React from 'react'
import  { View, ScrollView} from 'react-native'
import { connect } from 'react-redux';

import AlbumList from '../Library/AlbumList'
import AlbumDetails from '../Library/AlbumDetail'
import ArtistInfo from '../artistInfo';

import styles from '../../styles/global'
import a_styles from '../../styles/artists'

const mapStateToProps = state => ({
    artist: state.library.selectedArtist,
    album: state.library.selectedAlbum
})

const ArtistDetail = ({ artist, album, width, height, isMobile }) => {
        let detailHeight = isMobile ? height : (height - 160);
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
                ? (<View style={[a_styles.albumList, styles.background3, {width: width}]}>  
                        <AlbumList width={width}/>
                    </View>)
                : (null)
        return (
            <ScrollView contentContainerStyle={{ 
                    flexGrow: 1, 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'}}
                    style={[styles.background1, a_styles.container, {width: width, height: height}]}>
                <View style={{height: (detailHeight)}}>
                    {detailView}
                </View>
                {albumList}
            </ScrollView>);
    }

export default connect(mapStateToProps)(ArtistDetail)