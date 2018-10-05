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
        let { dispatch, isMobile } = this.props;
        let menuItemStyle = isMobile ? m_styles.mobileMenuItem : m_styles.menuItem;
        let menuItemImgStyle = isMobile ? m_styles.mobileMenuItemImg : m_styles.menuItemImg;

        return (
        <View 
            style={m_styles.menuHeader}>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_NOWPLAYING))}>
                <View style={[menuItemStyle, this.isMenuIconActive(MENU_NOWPLAYING) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/av/ic_play_circle_outline_white_24dp.png')} style={menuItemImgStyle}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => this.resetLibrary()}>
                <View style={[menuItemStyle, this.isMenuIconActive(MENU_LIBRARY) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/av/ic_album_white_24dp.png')} style={menuItemImgStyle}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_PLAYLIST))}>
                <View style={[menuItemStyle, , this.isMenuIconActive(MENU_PLAYLIST) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/av/ic_queue_music_white_24dp.png')} style={menuItemImgStyle}/>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_SEARCH))}>
                <View style={[menuItemStyle, , this.isMenuIconActive(MENU_SEARCH) ? m_styles.selectedMenuItem : {}]}>
                    <Image source={require('../images/navigation/ic_search_white_24dp.png')} style={menuItemImgStyle}/>
                </View>
            </TouchableWithoutFeedback>
            <View style={menuItemStyle}>
                <Image source={require('../images/action/ic_settings_white_24dp.png')} style={menuItemImgStyle}/>
            </View>
        </View>);
    }
}



export default connect(mapStateToProps)(Menu)