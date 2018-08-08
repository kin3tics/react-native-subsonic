import React from 'react'
import  { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux';

import {
    MENU_MAIN,
    MENU_LIBRARY
 } from '../actions/menu-actions'

import styles from '../styles/global'

import Menu from './Menu'
import ArtistList from './ArtistList'

const mapStateToProps = state => ({
    menu: state.menu
})

const Dashboard = ({ dispatch, menu }) => {
    if (menu.active === MENU_MAIN)
        return <Menu />
    return <ArtistList />
}

export default connect(mapStateToProps)(Dashboard)