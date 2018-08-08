import React from 'react'
import  { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux';

import {
    setServerName,
    setServerUser,
    setServerPassword,
    pingServer
} from '../actions/server-actions'

import styles from '../styles/global'

const mapStateToProps = state => ({
    serverInfo: state.server
})

function errorMessage(message) {
    return <View><Text>{message}</Text></View>;
}

const ServerInput = ({ dispatch, serverInfo }) => { 
    return (
        <View style={[styles.container, styles.centeredcontainer]}>
            <View style={[{padding: 5}, styles.background2]}>
            <View style={{flexDirection:'row', padding:5}}>
                <Text style={[{width:100, padding: 5}, styles.font1]}>Server URL: </Text>
                <TextInput
                    placeholder="Server URL"
                    onChangeText={(text) => dispatch(setServerName(text))}
                    value={(serverInfo)?serverInfo.url:null}
                    style={styles.inputText}
                    //textContentType='URL'
                />
            </View>
            <View style={{flexDirection:'row', padding:5}}>
                <Text style={[{width:100, padding: 5}, styles.font1]}>Username: </Text>
                <TextInput
                    placeholder="Username"
                    onChangeText={(text) => dispatch(setServerUser(text))}
                    value={(serverInfo)?serverInfo.user:null}
                    style={styles.inputText}
                    //textContentType='username'
                />
            </View>
            <View style={{flexDirection:'row', padding: 5}}>
                <Text style={[{width:100, padding: 5}, styles.font1]}>Password: </Text>
                <TextInput
                    placeholder="Password"
                    onChangeText={(text) => dispatch(setServerPassword(text))}
                    value={(serverInfo)?serverInfo.password:null}
                    style={styles.inputText}
                    //textContentType='password'
                    secureTextEntry={true}
                />
            </View>
            {!serverInfo.valid && errorMessage(serverInfo.message)}
            <Button
                onPress={() => dispatch(pingServer())}
                title="Login"
            />
            </View>
        </View>
    )
}

export default connect(
    mapStateToProps
)(ServerInput)