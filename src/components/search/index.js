import React, { useState, useRef } from 'react'
import  { TextInput, View, ScrollView, TouchableWithoutFeedback } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import SearchAlbums from './albums-component'
import SearchArtists from './artists-component'
import SearchSongs from './songs-component'

import a_styles from '../../styles/artists'

import {searchServer} from '../../actions/library-actions'


const mapStateToProps = state => ({
    server: state.server,
    searchText: state.library.searchQuery,
    searchResults: state.library.searchResults
})

const delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

const Search = ({ dispatch, theme, width, height, searchText }) => {
    const [ text, setText ] = useState(searchText);
    const searchInput = useRef();

    function textChange(text) {
        setText(text);
        delay(function() {
            dispatch(searchServer(text))
        }, 1000)
    }
    let windowWidth = width;

    let cancelButton = null;
    let searchResults = null;
    if (text && text.length > 0) {
        cancelButton = (<TouchableWithoutFeedback
            onPress={() => { 
                setText('');
                searchInput.current.focus()
            }}>
            <FontAwesomeIcon icon={ faTimesCircle } size={20} style={{ margin: 10, color: theme.foreground }} />
        </TouchableWithoutFeedback>)
        
        searchResults = (<View>
                <SearchArtists width={width}/>
                <SearchAlbums width={width}/>
                <SearchSongs width={width}/>
            </View>)
    }

    return (
        <View style={[{width: windowWidth, height: height, paddingBottom: 15}]}> 
            <View>
            <TouchableWithoutFeedback
                >
                <View style={a_styles.searchBox}>
                    <TouchableWithoutFeedback
                        onPress={() => { searchInput.current.focus() }}>
                        <FontAwesomeIcon icon={ faSearch } size={20} style={{ margin: 10, color: theme.foreground }} />
                    </TouchableWithoutFeedback>
                    <TextInput 
                        ref={searchInput} 
                        style={[a_styles.searchInput, { color: theme.foreground }]}
                        onChangeText={(text) => textChange(text)}
                        value={text}></TextInput>
                    {cancelButton}
                </View>
            </TouchableWithoutFeedback>
            </View>
            <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
                style={{width: windowWidth}}>
                {searchResults}
            </ScrollView>
        </View>);
}

export default connect(mapStateToProps)(withTheme(Search))