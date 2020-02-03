import React, { Component } from 'react'
import  { View, ScrollView} from 'react-native'
import { connect } from 'react-redux';

import AlbumList from './AlbumList'
import AlbumDetails from '../albumDetail'
import ArtistInfo from './ArtistInfo'
import ArtistInfo_mobile from './ArtistInfo_mobile'

import styles from '../../styles/global'
import a_styles from '../../styles/artists'

const mapStateToProps = state => ({
    server: state.server,
    artist: state.library.selectedArtist,
    album: state.library.selectedAlbum
})



class ArtistDetail extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        let { artist, album, width, height, isMobile } = this.props;
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
            ? isMobile 
                ? <ArtistInfo_mobile width={width} height={detailHeight} /> 
                : <ArtistInfo width={width} height={detailHeight} />
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
}

export default connect(mapStateToProps)(ArtistDetail)