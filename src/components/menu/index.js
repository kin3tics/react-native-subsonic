import React, { useState } from 'react'
import  { TouchableWithoutFeedback, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlayCircle, faRecordVinyl, faFileAudio, faSearch, faCog, faBars } from '@fortawesome/free-solid-svg-icons';

import m_styles from '../../styles/menu'

import {
    MENU_LIBRARY,
    MENU_PLAYLIST,
    MENU_NOWPLAYING,
    MENU_SEARCH,
    MENU_SETTINGS,
    setMenu,
 } from '../../actions/menu-actions'

 import {
    setSelectedArtist,
    setSelectedAlbum
 } from '../../actions/library-actions'

 const mapStateToProps = state => ({
    menu: state.menu
})

const Menu = ({ dispatch, isMobile, menu, theme, collapsible, width }) => {
    const [ expanded, setExpanded ] = useState(collapsible ? false : true);
    let menuItemImgSize = isMobile ? 42 : 24;
    let menuBackground = theme.dark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0, 0.15)';
    let iconWidthPercent = collapsible ? '16.667%' : '20%';
    if(!expanded) {
        return (<View 
        style={[m_styles.menuHeader, { width: (width ? width : '100%'), justifyContent: 'space-between', borderColor: 'transparent' }]}>
            <TouchableWithoutFeedback
                onPress={() => setExpanded(!expanded)}>
                <View style={{ width: iconWidthPercent, alignItems: 'center', backgroundColor: menuBackground }}>
                    <FontAwesomeIcon icon={ faBars } size={ menuItemImgSize } style={{ padding: 10, color: theme.comment }} />
                </View>
            </TouchableWithoutFeedback>
        </View>);
    }

    return (
    <View 
        style={[m_styles.menuHeader, { width: (width ? width : '100%'), justifyContent: 'space-between', borderColor: 'transparent' }]}>
        { collapsible && expanded && 
            (<TouchableWithoutFeedback
                onPress={() => setExpanded(!expanded)}>
                <View style={{ width: iconWidthPercent, alignItems: 'center', backgroundColor: menuBackground }}>
                    <FontAwesomeIcon icon={ faBars } size={ menuItemImgSize } style={{ padding: 10, color: theme.comment }} />
                </View>
            </TouchableWithoutFeedback>)}
        <TouchableWithoutFeedback
            onPress={() => dispatch(setMenu(MENU_NOWPLAYING))}>
            <View style={{ width: iconWidthPercent, alignItems: 'center', backgroundColor: (MENU_NOWPLAYING === menu.active) ? 'transparent' : menuBackground }}>
                <FontAwesomeIcon icon={ faPlayCircle } size={ menuItemImgSize } style={{ padding: 10, color: (MENU_NOWPLAYING === menu.active) ? theme.first : theme.comment }} />
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
            onPress={() => {
                if(menu.active == MENU_LIBRARY) {
                    dispatch(setSelectedArtist(null))
                    dispatch(setSelectedAlbum(null))
                }  
                dispatch(setMenu(MENU_LIBRARY))
            }}>
            <View style={[{ width: iconWidthPercent, alignItems: 'center', backgroundColor: (MENU_LIBRARY === menu.active) ? 'transparent' : menuBackground }]}>
                <FontAwesomeIcon icon={ faRecordVinyl } size={ menuItemImgSize } style={{ padding: 10, color: (MENU_LIBRARY === menu.active) ? theme.first : theme.comment }} />
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
            onPress={() => dispatch(setMenu(MENU_PLAYLIST))}>
            <View style={[{ width: iconWidthPercent, alignItems: 'center', backgroundColor: (MENU_PLAYLIST === menu.active) ? 'transparent' : menuBackground }]}>
                <FontAwesomeIcon icon={ faFileAudio } size={ menuItemImgSize } style={{ padding: 10, color: (MENU_PLAYLIST === menu.active) ? theme.first : theme.comment }} />
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
            onPress={() => dispatch(setMenu(MENU_SEARCH))}>
            <View style={[{ width: iconWidthPercent, alignItems: 'center', backgroundColor: (MENU_SEARCH === menu.active) ? 'transparent' : menuBackground }]}>
                <FontAwesomeIcon icon={ faSearch } size={ menuItemImgSize } style={{ padding: 10, color: (MENU_SEARCH === menu.active) ? theme.first : theme.comment }} />
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
            onPress={() => dispatch(setMenu(MENU_SETTINGS))}>
            <View style={[{ width: iconWidthPercent, alignItems: 'center', backgroundColor: (MENU_SETTINGS === menu.active) ? 'transparent' : menuBackground }]}>
                <FontAwesomeIcon icon={ faCog } size={ menuItemImgSize } style={{ padding: 10, color: (MENU_SETTINGS === menu.active) ? theme.first : theme.comment }} />
            </View>
        </TouchableWithoutFeedback>
    </View>)
}



export default connect(mapStateToProps)(withTheme(Menu))