import React, { Component } from 'react';
import { View, TouchableOpacity, PermissionsAndroid, Alert } from 'react-native';
import InCallManager from 'react-native-incall-manager';

import { Icon } from 'react-native-elements';

import * as actions from '../appstate/actions'
import { connect } from 'react-redux'

import { HomeScreenBody } from '../components/ScreenParts/HomeScreenBody';
import firebase from 'react-native-firebase';
import ConnectyCube from 'connectycube-reactnative';

import CallingService from '../Backend/ConnectyCube/services/CallingService';

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Consult Me`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },

        headerRight: (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                        <Icon
                            type='material-community'
                            name='settings-outline' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.setParams('user', navigation.getParam('user'))
                    navigation.navigate('ConsultantListScreen')
                }
                }>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                        <Icon
                            type='material-community'
                            name='account-search' />
                    </View>
                </TouchableOpacity>
            </View>
        )
    });
    state = {
        consultant_chats: [
            /*
            {
 
            },
            {
 
            }...
            */
        ],
        user_chats: [

        ],
        consultantsSelected: true,
    }




    changeTab = (tabName) => {
        if (tabName === 'consultingFrom') {
            this.setState({
                consultantsSelected: true,
            })
        } else if (tabName === 'consultingTo') {
            this.setState({
                consultantsSelected: false,
            })
        }
    }

    /*
    item:{
        chats:{
            lastMessage:{

            },
            id:{
                text: '',
                audio: '',
                image: '',
                createdAt: '',
                user:{
                    name: '',
                    uid: id,
                    avatar: '',
                }
            }
        }
        user:{
            name: '',
            uid: id,
            avatar: '',
            }    
        } 
    */
    onChatItemPress = ({ item }) => {
        this.props.setSelectedChatId(item.user.uid, this.state.consultantsSelected)
        firebase.database().ref(`users/${item.user.uid}/CCID`).once('value', ccid => {
            console.log("CCID of opponent", ccid)
            this.props.videoCallOpponentsIds([ccid.val()])
        })
        this.props.navigation.navigate('ChatScreen', {
            title: item.user.name,
        });
    }


    componentDidMount() {
        // call listeners
        // this.setupListeners();
        // preparation for Audio
        this.checkAudioPermission();
        this.checkCameraPermission();
        this.checkNotificationPermission();
        this.checkRecordPermission() // return promise
        this.setUpCallListener();
    }

    checkCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('You can use the camera');
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    setUpCallListener = () => {
        const { user } = this.props;
        this.props.onIncomingCallListener(user.uid, (call) => {
            var callerId = call.callerId;
            var type = call.type;
            var userMode = call.peerMode;
            var remaining = call.remaining;
            var price = call.price;
            console.log("CAll", call)
            if (callerId != -1) {
                if (type === 'audio') {
                    InCallManager.startRingtone();
                    this.props.setSelectedChatId(callerId, this.state.consultantsSelected)
                    this.props.navigation.navigate('AudioScreen', { incomingCall: callerId + "-" + user.uid, userMode, remaining, price })
                } else if (type === 'video') {
                    InCallManager.startRingtone();
                    this.props.setSelectedChatId(callerId, this.state.consultantsSelected)
                    this.props.navigation.navigate('VideoScreen', { incomingCall: callerId + "-" + user.uid, userMode, remaining, price })
                }
            } else {
                InCallManager.stopRingtone();
                this.props.navigation.goBack();
            }
        })
    }

    checkRecordPermission = () => {
        if (InCallManager.recordPermission !== 'granted') {
            InCallManager.requestRecordPermission()
                .then((requestedRecordPermissionResult) => {
                    console.log("InCallManager.requestRecordPermission() requestedRecordPermissionResult: ", requestedRecordPermissionResult);
                })
                .catch((err) => {
                    console.log("InCallManager.requestRecordPermission() catch: ", err);
                });
        }
    }

    checkNotificationPermission = async () => {
        try {
            let enabled = await firebase.messaging().hasPermission()
            if (enabled) {
                console.log("Push permission var, token al!");
                this.getToken();
            } else {
                this.requestPermission();
            }
        } catch (error) {
            console.log('checkPermisson error:', error.message);
        }
    }

    requestPermission = async () => {
        try {
            await firebase.messaging().requestPermission();
            // User has authorised
            this.getToken();
        } catch (error) {
            // User has rejected permissions
            console.log('permission rejected');
        }
    }

    getToken = async () => {
        try {
            let token = "";
            console.log("Existing token is,", token);
            if (!token) {
                token = await firebase.messaging().getToken();
                console.log("New Token is taken :", token);
                await this._saveToken(token);
            }
        } catch (error) {
            console.log('getToken error:', error.message);
        }

    }

    _saveToken = async (token) => {
        const { _user } = firebase.auth().currentUser;
        const url = `users/${_user.uid}/FCMToken/${token}`;

        if (token) {
            // user has a device token
            console.log('_saveToken url', url);
            console.log('_saveToken token', token);
            try {
                await firebase.database().ref(url).set(true);
                console.log("_saveToken FCMToken is saved to firebase!");
            } catch (error) {
                console.log("_saveToken has error", error.message);
            }
        }
    }

    checkAudioPermission = async () => {
        if (Platform.OS !== "android") {
            return Promise.resolve(true);
        }
        const rationale = {
            title: "Mikrofon Kullanma Izni",
            message:
                "Uygulama içi mikrofon kullanımına izin gerekmektedir.."
        };
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale);
        return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <HomeScreenBody changeTab={this.changeTab} consultantsSelected={this.state.consultantsSelected}
                    user={this.props.user} consultant_chats={this.props.consultant_chats} user_chats={this.props.user_chats}
                    onChatItemPress={this.onChatItemPress} />
            </View>
        )
    }
    setupListeners() {
        ConnectyCube.videochat.onCallListener = this.onCallListener.bind(this);
        ConnectyCube.videochat.onUserNotAnswerListener = this.onUserNotAnswerListener.bind(this);
        ConnectyCube.videochat.onAcceptCallListener = this.onAcceptCallListener.bind(this);
        ConnectyCube.videochat.onRemoteStreamListener = this.onRemoteStreamListener.bind(this);
        ConnectyCube.videochat.onRejectCallListener = this.onRejectCallListener.bind(this);
        ConnectyCube.videochat.onStopCallListener = this.onStopCallListener.bind(this);
        ConnectyCube.videochat.onSessionConnectionStateChangedListener = this.onSessionConnectionStateChangedListener.bind(this);
    }
    onCallListener(session, extension) {
        console.log('onCallListener, extension: ', extension);

        const {
            videoSessionObtained,
            setMediaDevices,
            localVideoStreamObtained,
            callInProgress
        } = this.props

        videoSessionObtained(session);

        Alert.alert(
            'Incoming call',
            'from user',
            [
                {
                    text: 'Accept', onPress: () => {
                        console.log('Accepted call request');

                        this.props.navigation.navigate("VideoScreen")
                        CallingService.getVideoDevices()
                            .then(setMediaDevices);

                        CallingService.getUserMedia(session).then(stream => {
                            localVideoStreamObtained(stream);
                            CallingService.acceptCall(session);
                            callInProgress(true);
                        });
                    }
                },
                {
                    text: 'Reject',
                    onPress: () => {
                        console.log('Rejected call request');
                        CallingService.rejectCall(session);
                    },
                    style: 'cancel',
                },
            ],
            { cancelable: false },
        );
    }

    onUserNotAnswerListener(session, userId) {
        CallingService.processOnUserNotAnswer(session, userId);

        this.props.userIsCalling(false);
    }

    onAcceptCallListener(session, userId, extension) {
        CallingService.processOnAcceptCallListener(session, extension);
        this.props.callInProgress(true);
        this.props.setCallInProgress(true);
    }

    onRemoteStreamListener(session, userID, remoteStream) {
        this.props.remoteVideoStreamObtained(remoteStream, userID);
        this.props.userIsCalling(false);
    }

    onRejectCallListener(session, userId, extension) {
        CallingService.processOnRejectCallListener(session, extension);

        this.props.userIsCalling(false);

        this.props.clearVideoSession();
        this.props.clearVideoStreams();
        this.props.setCallInProgress(false);
    }

    onStopCallListener(session, userId, extension) {
        this.props.userIsCalling(false);
        this.props.callInProgress(false);

        this.props.clearVideoSession();
        this.props.clearVideoStreams();
        this.props.setCallInProgress(false);

        CallingService.processOnStopCallListener(session, extension);
    }

    onSessionConnectionStateChangedListener(session, userID, connectionState) {
        console.log('onSessionConnectionStateChangedListener', userID, connectionState);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        videoSessionObtained: videoSession => dispatch(videoSessionObtained(videoSession)),
        userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
        callInProgress: inProgress => dispatch(callInProgress(inProgress)),
        remoteVideoStreamObtained: remoteStream => dispatch(remoteVideoStreamObtained(remoteStream)),
        localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
        clearVideoSession: () => dispatch(clearVideoSession()),
        clearVideoStreams: () => dispatch(clearVideoStreams()),
        setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices)),
        setActiveVideoDevice: videoDevice => dispatch(setActiveVideoDevice(videoDevice))
    }
}



const mapStateToProps = (state) => {
    console.log("state", state)
    const { auth, chat } = state;
    const { user } = auth
    const { consultant_chats, user_chats, user_last_messages, consultant_last_messages, consultant_profiles, user_profiles, consultation_details, user_unread_count, consultant_unread_count } = chat;
    var userChats = [];
    var consultantChats = [];

    const userProfileArray = Object.keys(user_profiles).map(key => (user_profiles[key]));
    const consultantProfileArray = Object.keys(consultant_profiles).map(key => (consultant_profiles[key]));

    for (var i = 0; i < userProfileArray.length; i++) {
        var userProfile = userProfileArray[i];
        console.log("User profile uid", userProfile.uid)
        var chatObj = {
            lastMessage: consultant_last_messages[userProfile.uid],
            unreadCount: consultant_unread_count[userProfile.uid]
        };
        chatObj.user = userProfile;
        chatObj.chat = user_chats[userProfile.uid]
        consultantChats.push(chatObj);
    }

    for (var i = 0; i < consultantProfileArray.length; i++) {
        var userProfile = consultantProfileArray[i];
        console.log("Consultant profile uid", userProfile.uid)
        var chatObj = {
            lastMessage: user_last_messages[userProfile.uid],
            unreadCount: user_unread_count[userProfile.uid]
        };
        chatObj.user = userProfile;
        chatObj.chat = consultant_chats[userProfile.uid]
        userChats.push(chatObj);
    };

    console.log("userChats", userChats)

    return { user, consultant_chats: consultantChats, user_chats: userChats, consultant_profiles, user_profiles, consultation_details }
}
export default connect(mapStateToProps, actions)(HomeScreen);