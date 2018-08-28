import React, {Component} from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import a_styles from '../styles/artists'
import m_styles from '../styles/menu'

import { getSelectedArtistFromServer } from '../actions/library-actions'

import {
    MENU_MAIN,
    setMenu,
 } from '../actions/menu-actions'

const mapStateToProps = state => ({
    artists: state.library.artists
})

const renderSectionHeader = ({section}) => {
    return (
        <View style={[a_styles.subHeader, styles.background1]}>
            <Text style={[styles.font1, a_styles.subHeaderText]}>{section.title}</Text>
        </View>);
}

const renderItem2 = ({item}) => {
    return (
        <TouchableWithoutFeedback>
            <View style={a_styles.listItem2}><Text style={[styles.font1, a_styles.listItem2]}>{item.title}</Text></View>
        </TouchableWithoutFeedback>);
}

class ArtistList extends Component  {
    constructor(props) {
        super(props);
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
        let {dispatch, artists} = this.props;
        let {width, height} = Dimensions.get('window')

        if(artists.length == 0) return (
            <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
                style={[styles.background2, a_styles.container]}>
                <View style={{height: (height - 50)}}>
                    {this.renderMenuIcon()}
                </View>
                <View style={[a_styles.footer]}></View>
            </ScrollView>);

        return (
            <ScrollView contentContainerStyle={{ 
                    flexGrow: 1, 
                    flexDirection: 'column', 
                    justifyContent: 'space-between'}}
                style={[styles.background2, a_styles.container]}>
                <View style={{height: (height - 50)}}>
                    {this.renderMenuIcon()}
                    <SectionList 
                        sections={artists}
                        renderItem={({item}) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(getSelectedArtistFromServer(item.id))}>
                                    <View style={a_styles.listItem}><Text numberOfLines={1} style={[styles.font1, a_styles.listItem]}>{item.name}</Text></View>
                                </TouchableWithoutFeedback>)}}
                        renderSectionHeader={renderSectionHeader}
                        keyExtractor={(item) => item.id}
                        />
                </View>
                <View style={[a_styles.footer]}>
                    <FlatList
                        data={artists}
                        renderItem = {renderItem2}
                        keyExtractor={(item) => item.title}
                        horizontal={false}
                        numColumns={14}
                    />
                    
                </View>
            </ScrollView>);
    }
}

export default connect(mapStateToProps)(ArtistList)