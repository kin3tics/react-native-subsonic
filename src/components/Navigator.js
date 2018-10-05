import React from 'react'
import  { Dimensions } from 'react-native'
import { connect } from 'react-redux';

//import styles from '../styles/global'

import ServerInput from './ServerInput'
import Dashboard from './Dashboard'
import MobileDashboard from './MobileDashboard'

const mapStateToProps = state => ({
    serverInfo: state.server
})

const Navigator = ({ dispatch, serverInfo }) => {
    if(!serverInfo.valid) {
        return (<ServerInput/>);
    }
    let {width} = Dimensions.get('window')
    if ( width > 1000 )
        return <Dashboard />
    
    return <MobileDashboard />
}

export default connect(
    mapStateToProps
)(Navigator)