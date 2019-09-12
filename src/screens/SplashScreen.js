import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import * as actions from '../appstate/actions';

import { connect } from 'react-redux';


class SplashScreen extends Component {


    state = {
        isProvider: false
    }

    componentDidMount = async () => {
        const firebaseUser = firebase.auth().currentUser;
        var user = {
            name: '',
            uid: '',
            number: '',
            photoURL: '',
            isProvider: false,
        };
        if (firebaseUser) {
            user.name = firebaseUser.displayName;
            user.number = firebaseUser.phoneNumber;
            user.photoURL = firebaseUser.photoURL;
            user.uid = firebaseUser.uid;

            //Todo change into firebase user isProvider
            await firebase.database().ref('users').child(user.uid).child('isProvider').once('value', snapshot => {
                if (snapshot.exists()) {
                    user.isProvider = snapshot.val();
                }
            })

            this.props.fetchUserChats(user,(chat) => {
                this.props.saveUserChat(chat)
            })
            if (user.isProvider) {
                this.props.fetchConsultantChats(user, (chat) => {
                    this.props.saveConsultantChat(chat);
                })
            }
        }
        this.props.fetchConsultants((consultant) => {
            this.props.saveConsultant(consultant);
        })
        this.props.saveUser(user);
        if (user.name) {
            this.props.navigation.setParams('user', user)
            setTimeout(() => {
                this.props.navigation.navigate('HomeScreen');
            }, 500)
        }
        else {
            setTimeout(() => {
                this.props.navigation.navigate('ConsultantListScreen');
            }, 500)
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