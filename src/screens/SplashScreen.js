import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import * as actions from '../appstate/actions';

import { connect } from 'react-redux';


class SplashScreen extends Component {


    componentDidMount = async() => {
        const firebaseUser = firebase.auth().currentUser;
        var user = {
            name: '',
            uid: '',
            number: '',
            photo: '',
        };
        if (firebaseUser) {
            console.log("FU", firebaseUser)
            user.name = firebaseUser.displayName;
            user.number = firebaseUser.phoneNumber;
            user.photo = firebaseUser.photoURL;
            user.uid = firebaseUser.uid;
        }
        console.log("Splash Screen did mount")
        await this.props.fetchConsultants((consultant) => {
            console.log("New consultant on Splash screen", consultant)
            this.props.saveConsultant(consultant);
        })
        this.props.saveUser(user);
        if (user.name) {
            console.log('user found')
            this.props.navigation.setParams('user', user)
            this.props.navigation.navigate('HomeScreen');
        }
        else {
            console.log('no user found')
            this.props.navigation.navigate('ConsultantListScreen');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Consult Me</Text>
            </View>
        )
    }
}

export default connect(null, actions)(SplashScreen);