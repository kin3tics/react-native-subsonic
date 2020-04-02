import React from 'react';
import  { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { withTheme,  } from '../../themeProvider';
import ServerSettings from './server-component';

import a_styles from '../../styles/artists'

const Settings = ({ width: windowWidth, height: height, theme, themes, setTheme }) => {
    const renderItem = (key, item) => (
        <TouchableOpacity key={key} onPress={() => setTheme(key)}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 35, padding: 5, backgroundColor: item.background, justifyContent: "space-between"}}>
                <Text style={{color: item.foreground}}>{item.name}</Text>
                <View style={{ display: "flex", flexDirection: "row"}}>
                    <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: item.first }}></View>
                    <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: item.second }}></View>
                    <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: item.third }}></View>
                    <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: item.fourth }}></View>
                    <View style={{ height: 20, width: 20, marginLeft: 15, marginRight: 15, backgroundColor: item.fifth }}></View>
                </View>
            </View>
        </TouchableOpacity>
    )

    return (
        <ScrollView
            style={{width: windowWidth, height: height, padding: 15}}>
            <Text style={[ a_styles.albumDetailTitle, { color: theme.first } ]}>Appearance</Text>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 15, paddingHorizontal: 10 }}>
                <Text style={[{ color: theme.foreground }]}>Active Theme: <Text>{theme.name}</Text></Text>
                <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: theme.first }}></View>
                <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: theme.second }}></View>
                <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: theme.third }}></View>
                <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: theme.fourth }}></View>
                <View style={{ height: 20, width: 20, marginLeft: 15, backgroundColor: theme.fifth }}></View>
            </View>
            <View style={{ height: 250, paddingHorizontal: 10, marginBottom: 15 }}>
                <ScrollView
                    style={{ borderColor: theme.foreground, borderWidth: 1 }}>
                    {Object.keys(themes).map(k => renderItem(k, themes[k]))}
                </ScrollView>
            </View>
            <ServerSettings />
        </ScrollView>);
}

export default withTheme(Settings)