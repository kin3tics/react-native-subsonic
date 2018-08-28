import React, {Component} from 'react'
import  { Text, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import a_styles from '../styles/artists'
import m_styles from '../styles/menu'

import { getPlaylistsFromServer, getSelectedPlaylistFromServer } from '../actions/library-actions'

import {
    MENU_MAIN,
    setMenu,
 } from '../actions/menu-actions'

const mapStateToProps = state => ({
    playlists: state.library.playlists
})

class PlaylistList extends Component  {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let {dispatch} = this.props;
        dispatch(getPlaylistsFromServer());
    }

    renderMenuIcon() {
        let {dispatch} = this.props;
        return (
            <TouchableWithoutFeedback
                onPress={() => dispatch(setMenu(MENU_MAIN))}>
                <View style={m_styles.menuHeader}>
                    <Image source={require('../images/navigation/ic_menu_white_24dp.png')} style={{height:24,width:24}}/>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    render() {
        let {dispatch, playlists} = this.props;
        let {width, height} = Dimensions.get('window')

        if(playlists.length == 0) return (
            <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
                style={[styles.background2, a_styles.container]}>
                <View>
                    {this.renderMenuIcon()}
                </View>
            </ScrollView>);

        return (
            <ScrollView contentContainerStyle={{ 
                    flexGrow: 1, 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'}}
                style={[styles.background2, a_styles.container]}>
                <View>
                    {this.renderMenuIcon()}
                    <FlatList 
                        data={playlists}
                        renderItem={({item}) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(getSelectedPlaylistFromServer(item.id))}>
                                    <View style={a_styles.listItem}><Text numberOfLines={1} style={[styles.font1, a_styles.listItem]}>{item.name}</Text></View>
                                </TouchableWithoutFeedback>)}}
                        keyExtractor={(item) => item.id}
                        />
                </View>
            </ScrollView>);
    }
}

export default connect(mapStateToProps)(PlaylistList)