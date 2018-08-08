import React from 'react';
import { StyleSheet, Text, View, AppState, AsyncStorage } from 'react-native';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

import Navigator from './components/Navigator'
import ServerInput from './components/ServerInput'

import rootReducer from './reducers'

import styles from './styles/global'

export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isStoreLoading: false,
          store: null
      }
    }

    componentWillMount() {
      var self = this;
      this.setState({isStoreLoading: true});

      AsyncStorage.getItem('serverInfo').then((value)=>{
        if(value && value.length){
          let initialStore = {server: JSON.parse(value)}
          self.setState({store: configureStore(initialStore)});
        } else {
          self.setState({store: configureStore()});
        }
        this.setState({isStoreLoading: false});
      }).catch((error)=>{
        self.setState({store: configureStore()});
        this.setState({isStoreLoading: false});
      })
    }

  render() {
    if(this.state.isStoreLoading) {
       return (
          <View style={[styles.container, styles.background1]}>
            <Text style={styles.font1}>Loading...</Text>
          </View>
        );
    }
    return (
      <Provider store={this.state.store}>
        <View style={[styles.container, styles.background1]}>
          <Navigator />
      </View>
      </Provider>
    );
  }
}