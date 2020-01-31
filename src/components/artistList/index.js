import React, { useEffect } from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';

import Menu from '../menu/index'

import styles from '../../styles/global'
import a_styles from '../../styles/artists'

import { 
    getArtistsFromServer,
    getSelectedArtistFromServer, 
    setSelectedAlbum 
} from '../../actions/library-actions'

const mapStateToProps = state => ({
    artists: state.library.artists
})

const ArtistList = ({ dispatch, artists, theme }) => {
    useEffect(() => {
        if(!artists || artists.length === 0) dispatch(getArtistsFromServer());
    })

    const sectionList = React.createRef();
    const scrollTo = (sectionIndex, itemIndex) => {
        if(sectionList && sectionList.current) {
            sectionList.current.scrollToLocation({
                sectionIndex: sectionIndex,
                itemIndex: itemIndex,
                viewOffset: -25,
                ViewPosition: 0,
                animated: false
            })
        }
    }
    let { height } = Dimensions.get('window');
    let backgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,.03)';
    let headerBackgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,.08)';

    if(artists.length == 0) return (
        <ScrollView contentContainerStyle={{ 
            flexGrow: 1, 
            flexDirection: 'column', 
            justifyContent: 'space-between'}}
            style={[a_styles.container, { backgroundColor: backgroundColor}]}>
            <View style={{height: (height - 50)}}>
                <Menu />
            </View>
            <View style={[a_styles.footer]}></View>
        </ScrollView>);

    return (
        <ScrollView contentContainerStyle={{ 
                flexGrow: 1, 
                flexDirection: 'column', 
                justifyContent: 'space-between'}}
            style={[a_styles.container, { backgroundColor: backgroundColor}]}>
            <View style={{height: (height - 75)}}>
                <Menu />
                <SectionList 
                    ref={sectionList}
                    sections={artists ? artists : []}
                    getItemLayout={(data, index) => (
                        { length: data.length, offset: 25 * index, index }
                    )}
                    renderItem={({item}) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => {
                                    dispatch(getSelectedArtistFromServer(item.id))
                                    dispatch(setSelectedAlbum(null))
                                }}>
                                <View style={[a_styles.listItem, { height: 25 }]}><Text numberOfLines={1} style={[a_styles.listItem, { color: theme.foreground }]}>{item.name}</Text></View>
                            </TouchableWithoutFeedback>)}}
                    renderSectionHeader={({section}) => {
                        return (
                            <View style={{ backgroundColor: theme.background }}>
                                <View style={{ position: 'absolute', height: '100%', width: '100%', backgroundColor: headerBackgroundColor }} />
                                <Text style={[a_styles.subHeaderText, { margin: 5, color: theme.first }]}>{section.title}</Text>
                            </View>);
                    }}
                    stickySectionHeadersEnabled={true}
                    keyExtractor={(item) => item.id}
                    />
            </View>
            <View style={[a_styles.footer]}>
                <FlatList
                    data={artists}
                    renderItem = {({item, index}) => {
                        return (
                            <TouchableWithoutFeedback
                                onPress={() => scrollTo(index, 0)}>
                                <View style={a_styles.listItem2}><Text style={[a_styles.listItem2, { color: theme.foreground }]}>{item.title}</Text></View>
                            </TouchableWithoutFeedback>);
                    }}
                    keyExtractor={(item) => item.title}
                    horizontal={false}
                    numColumns={14}
                />
                
            </View>
        </ScrollView>);
}

export default connect(mapStateToProps)(withTheme(ArtistList))