import React, {Component} from 'react'
import  { TextInput, View, ScrollView, Dimensions, TouchableWithoutFeedback, Image} from 'react-native'
import { connect } from 'react-redux';

import SearchAlbums from './SearchAlbums'
import SearchArtists from './SearchArtists'
import SearchSongs from './SearchSongs'

import styles from '../styles/global'
import a_styles from '../styles/artists'

import {searchServer} from '../actions/library-actions'


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

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    componentWillMount() {
        let {searchText} = this.props;
        if(this.state.text != searchText)
            this.setState({text: searchText});
    }

    componentDidMount() {
        if(!this.state.text) {
            this.refs.searchInput.focus()
        }
    }

    textChange(text) {
        let {dispatch} = this.props
        this.setState({text})
        delay(function() {
            dispatch(searchServer(text))
        }, 1000)
    }

    render() {
        let {width, height} = this.props;
        let windowWidth = width;

        let cancelButton = null;
        let searchResults = null;
        if (this.state.text && this.state.text.length > 0) {
            cancelButton = (<TouchableWithoutFeedback
                onPress={() => { 
                    this.setState({ text: ''}) 
                    this.refs.searchInput.focus()
                }}>
                <Image style={{height:20,width:20, margin: 10}} source={require('../images/navigation/ic_cancel_white_24dp.png')}/>
            </TouchableWithoutFeedback>)
            
            searchResults = (<View>
                    <SearchArtists width={width}/>
                    <SearchAlbums width={width}/>
                    <SearchSongs width={width}/>
                </View>)
        }

        return (
            <View style={[{width: windowWidth, height: height}]}> 
                <View>
                <TouchableWithoutFeedback
                    >
                    <View style={a_styles.searchBox}>
                        <TouchableWithoutFeedback
                            onPress={() => { this.refs.searchInput.focus() }}>
                            <Image style={{height:20,width:20, margin: 10}} source={require('../images/navigation/ic_search_white_24dp.png')}/>
                        </TouchableWithoutFeedback>
                        <TextInput 
                            ref='searchInput' 
                            style={a_styles.searchInput}
                            onChangeText={(text) => this.textChange(text)}
                            value={this.state.text}></TextInput>
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
}

export default connect(mapStateToProps)(Search)