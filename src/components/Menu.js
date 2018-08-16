import React from 'react'
import  { Text, TouchableWithoutFeedback, View, Image } from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import m_styles from '../styles/menu'

import {
    MENU_MAIN,
    MENU_LIBRARY,
    setMenu,
    dispatchArtistFetch
 } from '../actions/menu-actions'


const Menu = ({ dispatch, serverInfo }) => {
    return (
    <View style={[styles.container, styles.background2, m_styles.menu]}>
        <View style={m_styles.menuHeader}>
            <Image source={require('../images/navigation/ic_menu_white_24dp.png')} style={{height:24,width:24}}/>
            <Text style={[styles.font2, m_styles.menuHeaderText]}>Menu</Text>
        </View>
        <TouchableWithoutFeedback
            onPress={() => dispatch(dispatchArtistFetch(MENU_LIBRARY))}>
            <View style={m_styles.menuItem}>
                <Image source={require('../images/av/ic_album_white_24dp.png')} style={{height: 24, width: 24}}/>
                <Text style={[styles.font2, m_styles.menuItemText]}>Library</Text>
            </View>
        </TouchableWithoutFeedback>
        <View style={m_styles.menuItem}>
            <Image source={require('../images/navigation/ic_search_white_24dp.png')} style={{height: 24, width: 24}}/>
            <Text style={[styles.font2, m_styles.menuItemText]}>Search</Text>
        </View>
        <View style={m_styles.menuItem}>
            <Image source={require('../images/action/ic_settings_white_24dp.png')} style={{height: 24, width: 24}}/>
            <Text style={[styles.font2, m_styles.menuItemText]}>Settings</Text>
        </View>
    </View>);
}



export default connect()(Menu)