import React, { Component } from 'react'
import  { View, Dimensions } from 'react-native'
import { connect } from 'react-redux';
import {Surface} from 'gl-react-dom';
import timeLoop from "../helpers/timeLoop";

import Fluid from '../helpers/fluid2';

const mapStateToProps = state => ({
    server: state.server,
    nowPlaying: state.mediaPlayer
})

var lastRendered = 0;

class Visualizer extends Component {
    _analyzer = null
    constructor(props) {
        super(props);
        
    }

    componentDidUpdate() {
        var now = Date.now();
        var diff = now - lastRendered;
        lastRendered = now;
        var timeout = diff >= 16 ? 0 : 16 - diff;
        setTimeout(() => {
            this.forceUpdate();
        }, timeout);
    }
    
    render () {
        const { time, nowPlaying } = this.props;
        let {width, height} = Dimensions.get('window');
        
        if(!nowPlaying.songPalette) {
            return (<View width={width} height={height} />)
        }

        let {LightVibrant, LightMuted, DarkVibrant, DarkMuted} = nowPlaying.songPalette;
        
        let lightColor = LightVibrant 
            ? LightVibrant.getRgb() 
            : LightMuted 
                ? LightMuted.getRgb()
                : [128, 128, 128];
        let darkColor = DarkVibrant 
            ? DarkVibrant.getRgb() 
            : DarkMuted
                ? DarkMuted.getRgb()
                : [0, 0 ,0];
        return (
            <Surface width={width} height={height}>
                <Fluid 
                    color1 = {lightColor} 
                    color2 = {darkColor} 
                    time={time}
                    x={width}
                    y={height} />
                    
            </Surface>);
        }
}

export default connect(mapStateToProps)(timeLoop(Visualizer))