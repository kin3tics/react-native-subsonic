import React from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList} from 'react-native'
import { connect } from 'react-redux';

import styles from '../styles/global'
import a_styles from '../styles/artists'

const mapStateToProps = state => ({
    artists: state.artists.artists
})

const renderItem = ({item}) => {
    let text = item.name.length > 20 ? item.name.substring(0,17) + "..." : item.name;
    return (
        <TouchableWithoutFeedback>
            <View style={a_styles.listItem}><Text style={[styles.font1, a_styles.listItem]}>{text}</Text></View>
        </TouchableWithoutFeedback>);
}

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


const ArtistList = ({ dispatch, artists }) => {
    if(artists.length == 0) return <Text>Loading...</Text>
    let {width, height} = Dimensions.get('window')
    return (
        <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
             style={[styles.background2, a_styles.container]}>
            <View style={{height: (height - 50)}}>
                <SectionList 
                    sections={artists}
                    renderItem={renderItem}
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

export default connect(mapStateToProps)(ArtistList)