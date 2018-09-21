import React, {Component} from 'react'
import  { Text, View, Dimensions, TouchableWithoutFeedback} from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import a_styles from '../styles/artists'

import {getSelectedArtistFromServer} from '../actions/library-actions'
import {
    MENU_LIBRARY,
    dispatchArtistFetch
 } from '../actions/menu-actions'

const mapStateToProps = state => ({
    server: state.server,
    searchResults: state.library.searchResults
})

class SearchArtists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        let { dispatch, searchResults } = this.props
        let {width, height} = Dimensions.get('window')
        let windowWidth = width - 500;

        let artistsExist = (searchResults && searchResults.artist)
        let artists = artistsExist ? searchResults.artist.map((item) => {
            return (
                <View><TouchableWithoutFeedback
                    onPress={() => {
                        dispatch(dispatchArtistFetch(MENU_LIBRARY))
                        dispatch(getSelectedArtistFromServer(item.id))
                    }}>
                    <View style={a_styles.similarArtist}><Text style={[styles.font1, a_styles.listItem2]}>{item.name}</Text></View>
                </TouchableWithoutFeedback></View>)
        }) : [];

        if (!artistsExist)
            return(<View/>)

        return (
            <View>
                <Text style={[styles.font1, a_styles.albumDetailSubtitle]}>Artists</Text>
                <View style={[{flexDirection: 'row', width: windowWidth, flexWrap: 'wrap', alignItems: "flex-start", paddingLeft: 30, paddingRight: 30}]}>
                    {artists}
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps)(SearchArtists)