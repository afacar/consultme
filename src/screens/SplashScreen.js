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
            //get isProvider, ccid, ccpass and wallet info
            await firebase.database().ref('users').child(user.uid).once('value', snapshot => {
                if (snapshot.child('isProvider').exists()) {
                    user.isProvider = true;
                }else{
                    user.isProvider = false;
                }
                ccid = snapshot.child('CCID').val();
                ccpass = snapshot.child("CCPASS").val()
            })

            firebase.database().ref('wallets').child(user.uid).on('value', snapshot => {
                console.log("Wallet in splash screen", snapshot.val())
                if (snapshot.exists()) {
                    user.wallet = snapshot.val();
                    console.log("Wallet in splash screen", snapshot.val())
                }
                this.props.saveUser(user);
            })

            // fetch and save profiles of people, current user getting consultation from
            this.props.fetchUserChats(user, (profile) => {
                this.props.saveUserChat(profile);
            });

            // fetch and set lastMessages of chats in userMode
            // lastMessageObj = { lastMessage:{}, chatId:''}
            this.props.fetchUserLastMessages(user, (lastMessageObj) => {
                this.props.saveUserLastMessage(lastMessageObj);
            })

            // fetch messages from current user's consultants
            this.props.fetchUserMessages(user, (message) => {
                message.userMode = true;
                this.props.saveUserMessages(message)
            })

            // fetch and set pricing for each reaceived consultation of current user.
            this.props.fetchChatConsultationDetails(user, (consultation) => {
                this.props.saveConsultationDetails(consultation)
            })

            if (user.isProvider) {
                this.props.fetchConsultantChats(user, (profile) => {
                    this.props.saveConsultantChat(profile);
                });

                this.props.fetchConsultantLastMessages(user, (lastMessageObj) => {
                    console.log("New consultant mode last message  on Splash Screen ", lastMessageObj)
                    this.props.saveConsultantLastMessage(lastMessageObj);
                });

                this.props.fetchConsultantMessages(user, (message) => {
                    message.userMode = false;
                    console.log("New consultant message on splash screen ", message)
                    this.props.saveConsultantMessages(message)
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
                                })
                        })
                        .catch(e => {
                            this.props.userIsLogging(false);
                        })
                } else {
                    console.log("session err", error);
                }
            })
        }
        this.props.saveUser(user);
        this.props.fetchConsultants((consultant) => {
            this.props.saveConsultant(consultant);
        })
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