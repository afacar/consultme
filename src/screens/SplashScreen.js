import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'react-native-firebase';
import * as actions from '../appstate/actions';
import ConnectyCube from 'connectycube-reactnative'

import { connect } from 'react-redux';

import UserService from '../Backend/ConnectyCube/services/UserService'
import ChatService from '../Backend/ConnectyCube/services/ChatService'

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

            var ccid = '';
            var ccpass = '';
            //Todo change into firebase user isProvider
            await firebase.database().ref('users').child(user.uid).once('value', snapshot => {
                if (snapshot.child('isProvider').exists()) {
                    user.isProvider = snapshot.val();
                }
                ccid = snapshot.child('CCID').val();
                ccpass = snapshot.child("CCPASS").val()
            })

            this.props.fetchUserChats(user, (chat) => {
                this.props.saveUserChat(chat)
            })
            if (user.isProvider) {
                this.props.fetchConsultantChats(user, (chat) => {
                    this.props.saveConsultantChat(chat);
                })
            }

            console.log("CCID", ccid)
            // Connecty Cube login
            let userProfile = {
                id: ccid,
                login: user.number.slice(1),
                password: ccpass
            }
            ConnectyCube.createSession((error, session) => {
                if (session) {
                    console.log("session", session);
                    this.props.userIsLogging(true);
                    UserService.signin(userProfile)
                        .then((user) => {
                            ChatService.connect(userProfile)
                                .then((contacts) => {
                                    console.log("User", user);
                                    console.log("Contacts", contacts);
                                    this.props.userLogin(user);
                                    this.props.userIsLogging(false);
                                })
                                .catch(e => {
                                    this.props.userIsLogging(false);
                                    alert(`Error inside.\n\n${JSON.stringify(e)}`);
                                })
                        })
                        .catch(e => {
                            this.props.userIsLogging(false);
                            alert(`Error.\n\n${JSON.stringify(e)}`);
                        })
                } else {
                    console.log("session err", error);
                }
            })
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