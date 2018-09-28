import React, { Component } from 'react'
import  { View, ScrollView} from 'react-native'
import { connect } from 'react-redux';

import AlbumList from './AlbumList'
import AlbumDetails from './AlbumDetail'
import ArtistInfo from './ArtistInfo'

import styles from '../styles/global'
import a_styles from '../styles/artists'

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
        let { artist, album, width, height } = this.props;
        console.log('width:' + width + ' height: ' + height)
        let detailHeight = height - 160;
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
            ? <ArtistInfo width={width} height={detailHeight}/> 
            : <AlbumDetails width={width} height={detailHeight}/>
        return (
            <ScrollView contentContainerStyle={{ 
                    flexGrow: 1, 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'}}
                style={[styles.background1, a_styles.container, {width: width}]}>
                <View style={{height: (height)}}>
                    {detailView}
                </View>
                    <AlbumList width={width}/>
            </ScrollView>);
    }
}

export default connect(mapStateToProps)(ArtistDetail)