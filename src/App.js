import React from 'react';
import { Text, View } from 'react-native';
import { Provider, connect } from 'react-redux'
import { store, persistor } from './configureStore'
import { PersistGate } from 'redux-persist/integration/react';

import { LoginScreen } from './screens/login';
import { DashboardScreen } from './screens/dashboard';

import styles from './styles/global'

const mapStateToProps = state => ({
  serverInfo: state.server
})

const Main = connect(mapStateToProps)(({serverInfo}) => {
  return <View style={[styles.container, styles.background1]}>
    { !serverInfo.valid ? <LoginScreen/> : <DashboardScreen /> }
  </View>
})

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate 
        loading={(<View style={[styles.container, styles.background1]}><Text style={styles.font1}>Loading...</Text></View>)} 
        persistor={persistor}>
          <Main/>
      </PersistGate>
    </Provider>
  );
}


export default App;