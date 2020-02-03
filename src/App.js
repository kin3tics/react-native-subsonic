import React from 'react';
import { Text, View } from 'react-native';
import { Provider, connect } from 'react-redux'
import { store, persistor } from './configureStore'
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeContextProvider } from './themeProvider';

import { LoginScreen } from './screens/login';
import { DashboardScreen } from './screens/dashboard';

import styles from './styles/global'

const mapStateToProps = state => ({
  serverInfo: state.server
})

const Main = connect(mapStateToProps)(({serverInfo}) => {
  return !serverInfo.valid ? <LoginScreen/> : <DashboardScreen />;
})

const App = () => {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <PersistGate 
          loading={(<View style={[styles.container, styles.background1]}><Text style={styles.font1}>Loading...</Text></View>)} 
          persistor={persistor}>
            <Main/>
        </PersistGate>
      </ThemeContextProvider>
    </Provider>
  );
}


export default App;