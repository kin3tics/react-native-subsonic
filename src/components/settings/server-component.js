import React, { useState } from 'react';
import { connect } from 'react-redux';
import  { Text, View, TextInput, Button } from 'react-native'
import { withTheme,  } from '../../themeProvider';

import a_styles from '../../styles/artists'
import styles from '../../styles/global'

const mapStateToProps = state => ({
    serverInfo: state.server
})

const ServerSettings = ({ dispatch, serverInfo, theme }) => {
    const [serverUrl, setServerUrl] = useState(serverInfo.url);
    const [username, setUsername] = useState(serverInfo.user);
    const [password, setPassword] = useState();
    console.log(serverInfo);
    let inputBackground = theme.dark ? 'rgba(0,0,0, 0.15)' : 'rgba(255, 255, 255, 0.6)';
    return <View>
        <Text style={[ a_styles.albumDetailTitle, { color: theme.first } ]}>Server</Text>
        <View style={{ paddingHorizontal: 10 }}>
            <View style={{flexDirection: 'row', padding: 5}}>
                <Text style={[{width:100, padding: 5}, { color: theme.foreground }]}>Server URL: </Text>
                <TextInput
                    placeholder="Server URL"
                    onChangeText={(text) => setServerUrl(text)}
                    value={serverUrl}
                    style={[styles.inputText, { borderColor: theme.foreground, backgroundColor: inputBackground, color: theme.foreground }]}
                    />
            </View>
            <View style={{flexDirection: 'row', padding: 5}}>
                <Text style={[{width:100, padding: 5}, { color: theme.foreground }]}>Username: </Text>
                <TextInput
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                    style={[styles.inputText, { borderColor: theme.foreground, backgroundColor: inputBackground, color: theme.foreground }]}
                />
            </View>
            <View style={{flexDirection: 'row', padding: 5}}>
                <Text style={[{width:100, padding: 5}, { color: theme.foreground }]}>Password: </Text>
                <TextInput
                    placeholder="******"
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    style={[styles.inputText, { borderColor: theme.foreground, backgroundColor: inputBackground, color: theme.foreground }]}
                    secureTextEntry={true}
                />
            </View>
            <View style={{marginLeft: 105, width: 164, marginTop: 5 }}>
                <Button
                    color={theme.second}
                    onPress={() => {}}
                    title="Update"
                    />
            </View>
        </View> 
    </View>
}

export default connect(mapStateToProps)(withTheme(ServerSettings));