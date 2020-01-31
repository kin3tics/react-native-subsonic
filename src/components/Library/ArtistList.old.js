import React, {Component} from 'react'
import  { Text, SectionList, View, Dimensions, ScrollView, TouchableWithoutFeedback, FlatList, Image} from 'react-native'
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

const renderSectionHeader = ({section}) => {
    return (
        <View style={[a_styles.subHeader]}>
            <Text style={[styles.font1, a_styles.subHeaderText]}>{section.title}</Text>
        </View>);
}

class ArtistList extends Component  {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let {dispatch} = this.props;
        dispatch(getArtistsFromServer());
    }

    getItemLayout = (data, index) => (
        { length: data.length, offset: 25 * index, index }
    )

    scrollTo = (sectionIndex, itemIndex) => {
        if(this.sectionList) {
            this.sectionList.scrollToLocation({
                sectionIndex: sectionIndex,
                itemIndex: itemIndex,
                viewOffset: 38,
                ViewPosition: 0,
                animated: false
            })
        }
    }

    renderItem2 = ({item, index}) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.scrollTo(index, 0)}>
                <View style={a_styles.listItem2}><Text style={[styles.font1, a_styles.listItem2]}>{item.title}</Text></View>
            </TouchableWithoutFeedback>);
    }

    render() {
        let {dispatch, artists, theme} = this.props;
        let {width, height} = Dimensions.get('window')
        let backgroundColor = theme.dark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0,0,0,.03)'

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
                       ref={(sectionList) => { this.sectionList = sectionList }}
                        sections={artists}
                        getItemLayout={this.getItemLayout}
                        renderItem={({item}) => {
                            return (
                                <TouchableWithoutFeedback
                                    onPress={() => dispatch(getSelectedArtistFromServer(item.id))
                                                    .then(dispatch(setSelectedAlbum(null)))
                                                }>
                                    <View style={a_styles.listItem}><Text numberOfLines={1} style={[styles.font1, a_styles.listItem]}>{item.name}</Text></View>
                                </TouchableWithoutFeedback>)}}
                        renderSectionHeader={renderSectionHeader}
                        stickySectionHeadersEnabled={true}
                        keyExtractor={(item) => item.id}
                        />
                </View>
                <View style={[a_styles.footer]}>
                    <FlatList
                        data={artists}
                        renderItem = {this.renderItem2}
                        keyExtractor={(item) => item.title}
                        horizontal={false}
                        numColumns={14}
                    />
                    
                </View>
            </ScrollView>);
    }
}

export default connect(mapStateToProps)(withTheme(ArtistList))