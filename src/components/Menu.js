import React, { Component } from 'react'
import  { Text, TouchableWithoutFeedback, View, Image, ScrollView } from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import m_styles from '../styles/menu'

import {
    MENU_MAIN,
    MENU_LIBRARY,
    MENU_PLAYLIST,
    MENU_NOWPLAYING,
    MENU_SEARCH,
    setMenu,
 } from '../actions/menu-actions'

 import {
    setSelectedArtist,
    setSelectedAlbum
 } from '../actions/library-actions'

 const mapStateToProps = state => ({
    menu: state.menu
})
 

class Menu extends Component {
    constructor(props) {
        super(props);
    }

    isMenuIconActive(menuItem) {
        let { menu } = this.props;
        return menuItem == menu.active;
    }

    resetLibrary() {
        let { dispatch, menu } = this.props;
        if(menu.active == MENU_LIBRARY) {
            dispatch(setSelectedArtist(null))
            dispatch(setSelectedAlbum(null))
        }  
        dispatch(setMenu(MENU_LIBRARY))
    }

    render() {
        let { dispatch } = this.props;

        return (
        <View 
            style={m_styles.menuHeader}>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_NOWPLAYING))}>
                <View style={[m_styles.menuItem, this.isMenuIconActive(MENU_NOWPLAYING) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/av/ic_play_circle_outline_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => this.resetLibrary()}>
                <View style={[m_styles.menuItem, this.isMenuIconActive(MENU_LIBRARY) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/av/ic_album_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_PLAYLIST))}>
                <View style={[m_styles.menuItem, , this.isMenuIconActive(MENU_PLAYLIST) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/av/ic_queue_music_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_SEARCH))}>
                <View style={[m_styles.menuItem, , this.isMenuIconActive(MENU_SEARCH) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/navigation/ic_search_white_24dp.png')} style={{height: 24, width: 24}}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={m_styles.menuItem}>
                <Image source={require('../images/action/ic_settings_white_24dp.png')} style={{height: 24, width: 24}}/>
            </View>
        </View>);
    }
}



export default connect(mapStateToProps)(Menu)