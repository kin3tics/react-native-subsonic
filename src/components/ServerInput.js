import React from 'react'
import  { Text, TextInput, View, Button } from 'react-native'
import { connect } from 'react-redux';

import {
    setServerName,
    setServerUser,
    setServerPassword,
    requestServerInfo,
    pingServer
} from '../actions/server-actions'

const mapStateToProps = state => ({
    serverInfo: state.server
})

const ServerInput = ({ dispatch, serverInfo }) => { 
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
            <View style={{flexDirection:'row'}}>
                <Text style={{width:100}}>Server URL: </Text>
                <TextInput
                    placeholder="Server URL"
                    onChangeText={(text) => dispatch(setServerName(text))}
                    value={(serverInfo)?serverInfo.url:null}
                    //textContentType='URL'
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{width:100}}>Username: </Text>
                <TextInput
                    placeholder="Username"
                    onChangeText={(text) => dispatch(setServerUser(text))}
                    value={(serverInfo)?serverInfo.user:null}
                    //textContentType='username'
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{width:100}}>Password: </Text>
                <TextInput
                    placeholder="Password"
                    onChangeText={(text) => dispatch(setServerPassword(text))}
                    value={(serverInfo)?serverInfo.password:null}
                    //textContentType='password'
                    secureTextEntry={true}
                />
            </View>
            <Button
                onPress={() => dispatch(pingServer())}
                title="Login"
            />
        </View>
    )
}

export default connect(
    mapStateToProps
)(ServerInput)