
import React, { Component } from 'react';

import { Provider } from 'react-redux';
import AppNavigator from './src/navigation/AppNavigator';

import store from './src/appstate/store';

import firebase from 'react-native-firebase';
import ConnectyCube from 'connectycube-reactnative';

import {} from 'react-native-agora'

class App extends Component {


  componentDidMount() {
    var firebaseConfig = {
      apiKey: "AIzaSyDA_ZyUXiOgD_xiici7mblZKOhuz-wNP3E",
      authDomain: "consultme-cb5ad.firebaseapp.com",
      databaseURL: "https://consultme-cb5ad.firebaseio.com",
      projectId: "consultme-cb5ad",
      storageBucket: "consultme-cb5ad.appspot.com",
      messagingSenderId: "384797318674",
      appId: "1:384797318674:web:88fd84a89629934f"
    };


    // Initialize Firebase
    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig)

    const CREDENTIALS = {
      appId: 1118,
      authKey: 'wxsJMy9AtAgEwdO',
      authSecret: '97CA47KGt8vsa7c'
    };

    // ConnectyCube.init(CREDENTIALS, { debug: 1 })
  }

  render() {

    return (
      <Provider store={store} >
        <AppNavigator />
      </Provider>);
  }
}



export default App;
