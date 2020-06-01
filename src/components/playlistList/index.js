import React, {useEffect} from 'react'
import  { Text, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';

import Menu from '../menu/index'

import a_styles from '../../styles/artists';

import { getPlaylistsFromServer, getSelectedPlaylistFromServer } from '../../actions/library-actions'

const mapStateToProps = state => ({
    playlists: state.library.playlists
});

const PlaylistList = ({ dispatch, playlists, theme }) =>  {
    useEffect(() => {
        if(!playlists || playlists.length === 0) dispatch(getPlaylistsFromServer());
    });

    let {height} = Dimensions.get('window');
    let backgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,.03)';
    let headerBackgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.08)';

    if(playlists.length == 0) return (
        <ScrollView contentContainerStyle={{ 
            flexGrow: 1, 
            flexDirection: 'column', 
            justifyContent: 'space-between'}}
            style={[a_styles.container, { backgroundColor:  backgroundColor }]}>
            <View style={{height: height}}>
                <Menu />
            </View>
        </ScrollView>);

    return (
        <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
            style={[a_styles.container, { backgroundColor: backgroundColor }]}>
            <View style={{height: height, paddingBottom: 15 }}>
                <Menu />
                <View style={{ backgroundColor: theme.background }}>
                    <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: headerBackgroundColor }} />
                    <Text style={[a_styles.subHeaderText, { margin: 5, color: theme.first }]}>Playlists</Text>
                </View>
                <FlatList 
                    data={playlists}
                    renderItem={({item}) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => dispatch(getSelectedPlaylistFromServer(item.id))}>
                                <View style={[a_styles.listItem, { height: 25 }]}><Text numberOfLines={1} style={[a_styles.listItem, { color: theme.foreground }]}>{item.name}</Text></View>
                            </TouchableWithoutFeedback>)}}
                    keyExtractor={(item) => item.id}
                    />
            </View>
        </ScrollView>);
}

export default connect(mapStateToProps)(withTheme(PlaylistList))