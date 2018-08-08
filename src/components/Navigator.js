import React from 'react'
//import  { Text, SectionList, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux';

//import styles from '../styles/global'

import ServerInput from './ServerInput'
import Dashboard from './Dashboard'

const mapStateToProps = state => ({
    serverInfo: state.server
})

const Navigator = ({ dispatch, serverInfo }) => {
    if(!serverInfo.valid) {
        return (<ServerInput/>);
    }
    return <Dashboard />
}

export default connect(
    mapStateToProps
)(Navigator)