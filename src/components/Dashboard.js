import React from 'react'
import  { Text, TextInput, View, Button, Dimensions } from 'react-native'
import { connect } from 'react-redux';

import {
    MENU_MAIN,
    MENU_LIBRARY
 } from '../actions/menu-actions'

import styles from '../styles/global'

import Menu from './Menu'
import ArtistList from './ArtistList'
import ArtistDetail from './ArtistDetail'
import NowPlayingSidebar from './NowPlayingSidebar';
//import MediaPlayer from './MediaPlayer';

const mapStateToProps = state => ({
    menu: state.menu
})

const Dashboard = ({ dispatch, menu }) => {
    if (menu.active === MENU_MAIN)
        return <Menu />
    return (<View style={{flexDirection:'row'}}>
            <View>
                <ArtistList />
            </View>
            <View>
                <ArtistDetail />
            </View>
            <View>
                <NowPlayingSidebar />
            </View>
        </View>)
}

export default connect(mapStateToProps)(Dashboard)