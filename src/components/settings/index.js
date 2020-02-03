import React from 'react'
import  { Text, View, ScrollView, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux';
import { withTheme,  } from '../../themeProvider';

const Settings = ({ theme, themes, setTheme }) => {
    const renderItem = (key, item) => (
        <TouchableOpacity key={key} onPress={() => setTheme(key)}>
            <View style={{ height: 25, padding: 5, backgroundColor: item.background}}>
                <Text style={{color: item.foreground}}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <View>
            <Text style={{ color: theme.foreground }}>Active Theme: <Text style={{ fontWeight: 'bold' }}>{theme.name}</Text></Text>
            <ScrollView
                style={{ height: 100, borderColor: theme.foreground, borderWidth: 1 }}>
                {Object.keys(themes).map(k => renderItem(k, themes[k]))}
            </ScrollView>
        </View>);
}

export default withTheme(Settings)