import React from 'react'
import  { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux';
import { withTheme } from '../../themeProvider';

import {
    setServerName,
    setServerUser,
    setServerPassword,
    pingServer
} from '../../actions/server-actions'

import styles from '../../styles/global'

const mapStateToProps = state => ({
    serverInfo: state.server
})

const LoginScreen = ({ dispatch, serverInfo, theme }) => { 
    let containerBackground = theme.dark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0,0,0, 0.15)';
    let inputBackground = theme.dark ? 'rgba(0,0,0, 0.15)' : 'rgba(255, 255, 255, 0.6)';
    return (
        <View style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={[styles.container, styles.centeredcontainer]}>
                <View style={[{padding: 5}, { backgroundColor: containerBackground }]}>
                <View style={{flexDirection:'row', padding:5}}>
                    <Text style={[{width:100, padding: 5}, styles.font1, { color: theme.foreground }]}>Server URL: </Text>
                    <TextInput
                        placeholder="Server URL"
                        onChangeText={(text) => dispatch(setServerName(text))}
                        value={(serverInfo)?serverInfo.url:null}
                        style={[styles.inputText, { borderColor: theme.foreground, backgroundColor: inputBackground, color: theme.foreground }]}
                        //textContentType='URL'
                    />
                </View>
                <View style={{flexDirection:'row', padding:5}}>
                    <Text style={[{width:100, padding: 5}, styles.font1, { color: theme.foreground }]}>Username: </Text>
                    <TextInput
                        placeholder="Username"
                        onChangeText={(text) => dispatch(setServerUser(text))}
                        value={(serverInfo)?serverInfo.user:null}
                        style={[styles.inputText, { borderColor: theme.foreground, backgroundColor: inputBackground, color: theme.foreground }]}
                        //textContentType='username'
                    />
                </View>
                <View style={{flexDirection:'row', padding: 5}}>
                    <Text style={[{width:100, padding: 5}, styles.font1, { color: theme.foreground }]}>Password: </Text>
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={theme.comment}
                        onChangeText={(text) => dispatch(setServerPassword(text))}
                        //value={(serverInfo)?serverInfo.password:null}
                        style={[styles.inputText, { borderColor: theme.foreground, backgroundColor: inputBackground, color: theme.foreground }]}
                        //textContentType='password'
                        secureTextEntry={true}
                    />
                </View>
                {!serverInfo.valid && (<View><Text style={[{ color: theme.first }]}>{serverInfo.message}</Text></View>)}
                <Button
                    color={theme.second}
                    onPress={() => dispatch(pingServer())}
                    title="Login"
                />
                </View>
            </View>
        </View>
    )
}

export default connect(
    mapStateToProps
)(withTheme(LoginScreen))