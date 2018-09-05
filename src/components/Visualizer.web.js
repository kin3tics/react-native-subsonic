import React, { Component } from 'react'
import  { Text, ProgressBar, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image, ART} from 'react-native'
import { connect } from 'react-redux';
import * as Vibrant from 'node-vibrant';
import {Howler} from 'howler';
import {Surface} from 'gl-react-dom';

import { generateUrlwithId } from '../helpers/api-helper'
import { getDurationArray } from '../helpers/audio-helper'

import HelloBlue from '../helpers/helloBlue'

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

class Visualizer extends Component {
    _analyzer = null
    constructor(props) {
        super(props);
        this.state = {
            uri: '',
            palette: null
        }
    }
    componentWillMount() {
        //this._analyzer = Howler.ctx.createAnalyser()
        //Howler.masterGain.connect(this._analyzer)

        /*
        let {server, nowPlaying} = this.props;
        if(!nowPlaying || !nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex]) return;
        let uri = generateUrlwithId(server, 'getCoverArt', nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt)
        this.setUriState(uri);
        */
    }

    componentWillReceiveProps(nextProps)
    {
        /*
        let {server, nowPlaying} = nextProps;
        let uri = generateUrlwithId(server, 'getCoverArt', nowPlaying.activePlaylist[nowPlaying.activePlaylistIndex].coverArt)
        this.setUriState(uri);
        */
    }

    setUriState(uri) {
        if(uri === this.state.uri) return;

        let that = this;
        this.setState({uri: uri})
        
        let v = Vibrant.from(uri)
        v.getPalette((err, palette) => {
            console.log(palette);
            that.setState({ palette: palette })
        })
    }

    render () {
        let {width, height} = Dimensions.get('window');

        return (
            <Surface width={width} height={height}>
                <HelloBlue blue={0.5} />
            </Surface>);
        }
}

export default connect(mapStateToProps)(Visualizer)