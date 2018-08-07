import React from 'react';
import { StyleSheet, Text, View, AppState, AsyncStorage } from 'react-native';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import configureStore from './configureStore'

import ServerInput from './components/ServerInput'

import rootReducer from './reducers'


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
          <View style={styles.container}>
            <Text>Loading...</Text>
          </View>
        );
    }
    return (
      <Provider store={this.state.store}>
      <View style={styles.container}>
        <ServerInput />
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
