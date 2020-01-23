import React, { Component } from 'react'
import  { Text, ProgressBar, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';
import DraggableFlatList from '../SortableFlatList'

import { getSubsonicInstance } from '../../helpers/api-helper'
import { getDurationArray } from '../../helpers/audio-helper'

import { pauseSongInPlaylist, playSongInPlaylist, playNextSongInPlaylist, playPreviousSongInPlaylist, seekSong, setNewPlaylistOrder } from '../../actions/mediaPlayer-actions'

import styles from '../../styles/global'
import np_styles from '../../styles/nowPlaying'


function getColorForMissingArtwork(index) {
    let i = index % 5
    switch(i)
    {
        case 1:
            return styles.missingArtworkColor1
        case 2:
            return styles.missingArtworkColor2
        case 3:
            return styles.missingArtworkColor3
        case 4:
            return styles.missingArtworkColor4
        case 0:
        default:
            return styles.missingArtworkColor5
    }

}

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

class NowPlayingBottombar extends Component {
    constructor(props) {
        super(props);

    }
    componentWillReceiveProps(nextProps)
    {
        if (this.props.activePlaylistIndex !== nextProps.activePlaylistIndex)
        {
            this.props.activePlaylist = nextProps.activePlaylistIndex;
        }
    }

    getItemLayout = (data, index) => (
        { length: data.length, offset: 15 * index, index }
    )

    onTouchEvent(name, ev) {
        let {dispatch, nowPlaying} = this.props;
        //element is set to 150 width
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        
        var percentDuration = ev.nativeEvent.locationX / 150
        var seekValue = percentDuration * song.duration;

        dispatch(seekSong(seekValue));
    }

    renderItem = ({item, index, move, moveEnd, isActive}) => {
        let {dispatch } = this.props;
        let itemColor = item.isActive ? styles.highlightFont : styles.font1;

        let songDuration = getDurationArray(item.duration);
        return (
            <TouchableWithoutFeedback 
                onPress={() => dispatch(playSongInPlaylist(index))}
                onLongPress={move}
                onPressOut={moveEnd}
                >
                <View style={[{flexDirection:'row', padding: 2}]}>
                    <View style={{width: 190}}>
                        <Text numberOfLines={1} style={[itemColor, {paddingLeft: 10}]}>{item.title} - {item.artist}</Text>
                    </View>
                    <View style={{width: 60, paddingRight: 10}} >
                        <Text style={[itemColor,{textAlign:'right'}]}>{songDuration[0]}:{songDuration[1]}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render () {
        let {dispatch, server, nowPlaying, width} = this.props;
        if(!nowPlaying || nowPlaying.activePlaylist.length === 0) 
            return(<View />);
        var uri = getSubsonicInstance(server).media.getCoverArt(nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt);
        
        var song = nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex];
        var playButton = !nowPlaying.isPlaying
                ?(<Image style={{height: 42, width:42}} source={require('../../images/av/ic_play_arrow_white_24dp.png')}/>)
                :(<Image style={{height: 42, width:42}} source={require('../../images/av/ic_pause_white_24dp.png')}/>);
        var seekProgress = (nowPlaying.songSeek / song.duration);
        return (
            <View style={[{flexDirection: 'row'}, styles.background2, np_styles.bottomBar]}> 
                <Image 
                    source={{ uri: uri}}
                    style={{height: 65, width: 65}} />
                <View
                    style={{padding: 15, width: (width - 75 - 126)}}>
                    <Text numberOfLines={1} style={[styles.font1, np_styles.bb_songText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].title}</Text>
                    <Text numberOfLines={1} style={[styles.font1, np_styles.bb_artistText]}>{nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].artist}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 14}}>
                    <TouchableWithoutFeedback onPress={() => dispatch(playPreviousSongInPlaylist())}>
                        <Image style={{height: 42, width:42}} source={require('../../images/av/ic_skip_previous_white_24dp.png')}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(pauseSongInPlaylist())}>
                        {playButton}
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => dispatch(playNextSongInPlaylist())}>
                        <Image style={{height: 42, width:42}} source={require('../../images/av/ic_skip_next_white_24dp.png')}/>
                    </TouchableWithoutFeedback>
                </View>
            </View>);
        }
}

export default connect(mapStateToProps)(NowPlayingBottombar)