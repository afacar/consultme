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
        console.log("FU", firebaseUser)
        var user = {
            name: '',
            uid: '',
            number: '',
            photoURL: '',
            isProvider: false,
        };
        if (firebaseUser) {
            console.log("FU", firebaseUser)
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
                console.log("New user chat on Splash screen", chat)
                this.props.saveUserChat(chat)
            })
            if (user.isProvider) {
                console.log("Start to fetch chats");
                this.props.fetchConsultantChats(user, (chat) => {
                    console.log("New consultant chat on Splash screen", chat)
                    this.props.saveConsultantChat(chat);
                })
            }
        }
        console.log("Splash Screen did mount")
        this.props.fetchConsultants((consultant) => {
            this.props.saveConsultant(consultant);
        })
        this.props.saveUser(user);
        if (user.name) {
            console.log('user found')
            this.props.navigation.setParams('user', user)
            setTimeout(() => {
                this.props.navigation.navigate('HomeScreen');
            }, 500)
        }
        else {
            console.log('no user found')
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