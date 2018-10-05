import React, { Component } from 'react'
import  { Text, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';

import styles from '../../styles/global'
import m_styles from '../../styles/menu'

import {
    MENU_LIBRARY,
    MENU_PLAYLIST,
    MENU_NOWPLAYING,
    MENU_SEARCH,
    setMenu,
 } from '../../actions/menu-actions'


 const mapStateToProps = state => ({
    menu: state.menu
})
 

class NowPlayingMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { dispatch } = this.props;

        return (
        <View 
            style={{flexDirection: 'row'}}>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_LIBRARY))}>
                <View style={[m_styles.menuItem]}>
                    <Image source={require('../../images/av/ic_album_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_PLAYLIST))}>
                <View style={[m_styles.menuItem]}>
                    <Image source={require('../../images/av/ic_queue_music_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_SEARCH))}>
                <View style={[m_styles.menuItem]}>
                    <Image source={require('../../images/navigation/ic_search_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={m_styles.menuItem}>
                <Image source={require('../../images/action/ic_settings_white_24dp.png')} style={{height: 24, width: 24}}/>
            </View>
        </View>);
    }
}



export default connect(mapStateToProps)(NowPlayingMenu)