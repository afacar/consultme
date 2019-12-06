import React, { Component, PureComponent } from 'react';
import { View, NativeModules, Text, Alert } from 'react-native';
import { AgoraView, RtcEngine } from 'react-native-agora';
import InCallManager from 'react-native-incall-manager';

import * as actions from '../appstate/actions';
import { connect } from 'react-redux';


import styles from '../Constants/Styles';
import { Button } from 'react-native-elements';
import { ActivityIndicator } from 'react-native-paper'
import firebase from 'react-native-firebase';
const { Agora } = NativeModules;

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
    Host,
    Adaptative
} = Agora

class VideoScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });
    state = {
        uid: Math.floor(Math.random() * 100),
        peerIds: [],
        appid: 'a0ee6b5742ca4cfe84d1e9fa4c97b946',
        channelName: this.props.navigation.getParam('incomingCall', undefined) ? this.props.navigation.getParam('incomingCall') : this.props.user.uid + "-" + this.props.peer.uid,
        vidMute: false,
        audMute: false,
        callState: this.props.navigation.getParam('incomingCall', undefined) ? 2 : 9, // 1-calling, 2- incoming 0-busy, -2- timeout, -1-check connection,
        joinSucceed: false,
        incomingCall: false,
        remaining: this.props.navigation.getParam('incomingCall', undefined) ? this.props.navigation.getParam('remaining', undefined) : 0,
        timer: 0,
        userMode: this.props.navigation.getParam('userMode', false)
    };

    componentWillMount() {
        var userMode = this.state.userMode
        const config = {
            appid: 'a0ee6b5742ca4cfe84d1e9fa4c97b946',
            channelProfile: this.props.navigation.getParam('channelProfile', 1),
            clientRole: this.props.navigation.getParam('clientRole', Host),
            videoEncoderConfig: {
                width: 360,
                height: 480,
                bitrate: 1,
                frameRate: FPS30,
                orientationMode: Adaptative,
            },
            audioProfile: AudioProfileDefault,
            audioScenario: AudioScenarioDefault
        }
        console.log("[CONFIG]", JSON.stringify(config));
        console.log("[CONFIG.encoderConfig", config.videoEncoderConfig);
        RtcEngine.on('videoSizeChanged', (data) => {
            console.log("[RtcEngine] videoSizeChanged ", data)
        })
        RtcEngine.on('remoteVideoStateChanged', (data) => {
            console.log('[RtcEngine] `remoteVideoStateChanged`', data);
        })
        RtcEngine.on('userJoined', (data) => {
            console.log("User joined", data)
            const { peerIds } = this.state;
            console.log("Peer ids ", peerIds)
            if (peerIds.indexOf(data.uid) === -1) {
                InCallManager.stopRingback();
                InCallManager.stopRingtone();
                this.setState({
                    peerIds: [...this.state.peerIds, data.uid],
                    callState: -9
                })
                this.remainingInterval = setInterval(() => {
                    var { remaining } = this.state;
                    console.log("remaining", remaining)
                    var formattedTimer = this.formatTimer(remaining);
                    this.setState({
                        remaining: remaining - 1,
                        timer: this.state.timer + 1,
                        formattedTimer
                    })
                    if (remaining <= 0) {
                        this.endCall();
                        if (userMode) {
                            Alert.alert(
                                'Yetersiz Kredi',
                                'Tekrar arama yapmak için kredi alınız',
                                [
                                    {
                                        text: 'Tamam',
                                        style: 'cancel'
                                    }
                                ]
                            )
                        }
                        else {
                            Alert.alert(
                                'Yetersiz Kredi',
                                'Karşı tarafın kredisi bitti',
                                [
                                    {
                                        text: 'Tamam',
                                        style: 'cancel'
                                    }
                                ]
                            )
                        }
                    }
                }, 1000)
            }
        })
        RtcEngine.on('userOffline', (data) => {
            console.log('[RtcEngine] onUserOffline', data);
            InCallManager.stop({ busytone: '_DTMF_' });
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid)
            })
            console.log('peerIds', this.state.peerIds, 'data.uid ', data.uid)
            this.endCall();
        })
        RtcEngine.on('joinChannelSuccess', (data) => {
            console.log('[RtcEngine] onJoinChannelSuccess', data);
            RtcEngine.startPreview().then(_ => {
                this.setState({
                    joinSucceed: true,
                    animating: false
                })
            })
        })
        RtcEngine.on('audioVolumeIndication', (data) => {
            console.log('[RtcEngine] onAudioVolumeIndication', data);
        })
        RtcEngine.on('clientRoleChanged', (data) => {
            console.log("[RtcEngine] onClientRoleChanged", data);
        })
        RtcEngine.on('videoSizeChanged', (data) => {
            console.log("[RtcEngine] videoSizeChanged", data);
        })
        RtcEngine.on('error', (data) => {
            console.log('[RtcEngine] onError', data);
            if (data.error === 17) {
                RtcEngine.leaveChannel().then(_ => {
                    this.setState({
                        joinSucceed: false
                    })
                    const { state, goBack } = this.props.navigation;
                    this.props.onCancel(data);
                    goBack();
                })
            }
        })
        RtcEngine.init(config);
    }

    componentDidMount() {
        const { user, peer } = this.props;
        var userMode = this.state.userMode
        if (!this.props.navigation.getParam('incomingCall', undefined)) {
            this.props.sendCall(user.uid, userMode, peer.uid, 'video', async (result) => {
                if (result.code === 1) {
                    RtcEngine.enableAudio();
                    InCallManager.start({ media: 'audio', ringback: '_DTMF_' })
                    this.setState({
                        remaining: result.remaining,
                        price: result.price
                    })
                    await RtcEngine.joinChannel(this.state.channelName, this.state.uid);
                } else if (result.code === 0) {
                    this.setState({
                        callState: -2
                    })
                } else if (result.code === -1) {
                    this.setState({
                        callState: 0
                    })
                }
            });
        } else {
            console.log("Incoming call on video screen")
            this.setState({
                incomingCall: true,
                callState: 2
            })
        }
    }

    acceptCall = async () => {
        await RtcEngine.joinChannel(this.state.channelName, this.state.uid);
        console.log('Channel Name ', this.state.channelName)
        var userMode = this.state.userMode
        RtcEngine.on('joinChannelSuccess', (data) => {
            InCallManager.stopRingtone();
            this.setState({
                joinSucceed: true,
                incomingCall: false,
            })
            this.setState({
                price: this.props.navigation.getParam('price', 0)
            })
            this.timerInterval = setInterval(() => {
                var { remaining } = this.state;
                var formattedTimer = this.formatTimer(remaining);
                this.setState({
                    remaining: remaining - 1,
                    timer: this.state.timer + 1,
                    formattedTimer
                })
                if (remaining <= 0) {
                    this.endCall();
                    if (userMode) {
                        Alert.alert(
                            'Yetersiz Kredi',
                            'Tekrar arama yapmak için kredi alınız',
                            [
                                {
                                    text: 'Tamam',
                                    style: 'cancel'
                                }
                            ]
                        )
                    }
                    else {
                        Alert.alert(
                            'Yetersiz Kredi',
                            'Karşı tarafın kredisi bitti',
                            [
                                {
                                    text: 'Tamam',
                                    style: 'cancel'
                                }
                            ]
                        )
                    }
                }
            }, 1000)
            RtcEngine.startPreview();
        })
        RtcEngine.on('userOffline', (data) => {
            InCallManager.stop({ busytone: '_DTMF_' });
            this.setState({
                peerIds: this.state.peerIds.filter(uid => uid !== data.uid),
            })
            this.endCall();
        })
        RtcEngine.enableAudio();
        RtcEngine.enableVideo();
    }

    formatTimer = (timer) => {
        timer = Number(timer);
        var h = Math.floor(timer / 3600);
        var m = Math.floor(timer % 3600 / 60);
        var s = Math.floor(timer % 3600 % 60);

        var hDisplay = h >= 1 ? h + ":" : "";
        var mDisplay = m >= 0 ? m + ":" : ""
        var sDisplay = s + "";

        hDisplay = hDisplay.length == 1 ? '0' + hDisplay : hDisplay;
        mDisplay = mDisplay.length == 1 ? '0' + mDisplay : mDisplay;
        sDisplay = sDisplay.length == 1 ? '0' + sDisplay : sDisplay;

        return hDisplay + mDisplay + sDisplay;
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.navigation.isFocused();
    }

    toggleAudio = () => {
        let mute = this.state.audMute
        RtcEngine.muteLocalAudioStream(!mute);
        this.setState({
            audMute: !mute
        })
    }

    toggleVideo = () => {
        let mute = this.state.vidMute
        RtcEngine.muteLocalVideoStream(!mute);
        this.setState({
            vidMute: !mute
        })
    }

    endCall = () => {
        InCallManager.stop();
        const { user, peer } = this.props;
        const { timer, price } = this.state;
        var value = parseFloat(timer) / parseFloat(60);
        value *= price;
        if (this.state.joinSucceed) {
            RtcEngine.leaveChannel().then(_ => {
                RtcEngine.destroy();
            })
            this.setState({
                joinSucceed: false
            })
        }
        if (this.timerInterval) {
            clearInterval(this.timerInterval)
        }

        if (this.state.userMode) {
            firebase.database().ref('moneyTransfer').push({
                from: user.uid,
                to: peer.uid,
                value: parseInt(value) / 2
            })
        } else {
            firebase.database().ref('moneyTransfer').push({
                from: peer.uid,
                to: user.uid,
                value: parseInt(value) / 2
            })
        }
        this.props.navigation.goBack();
        this.props.endCall(this.props.user.uid, this.props.peer.uid, (endCallResult) => {
        });
    }

    componentWillUnmount() {
        if (this.state.joinSucceed)
            this.endCall();
    }

    switchCamera = () => {
        RtcEngine.switchCamera();
    }

    renderCallState = () => {
        const { callState } = this.state;
        if (callState == -2) {
            return (
                <View style={{ flex: 1 }}>
                    <Text>Timeout</Text>
                </View>
            )
        }
        else if (callState == -1) {
            return (
                <View style={{ flex: 1 }}>
                    <Text>Aradığınız kullanıcı meşgul</Text>
                </View>
            )
        }
        else if (callState == 0) {
            return (
                <View style={{ flex: 1 }}>
                    <Text>Aradığınız kullanıcı başka biri ile görüşüyor</Text>
                </View>
            )
        }
        else if (callState == 1) {
            return (
                <View style={{ flex: 1 }}>
                    <Text>Aranıyor...</Text>
                </View>
            )
        }
        else {
            return (
                <View style={{ flex: 1 }}>
                    <Text style={{ color: 'white', fontSize: 16 }}>{this.state.formattedTimer}</Text>
                </View>
            )
        }
    }

    videoView() {
        if (this.state.callState === 2) {
            console.log("only local")
            return (
                <View style={{ flex: 1 }}>
                    <AgoraView style={styles.localView} showLocalVideo={!this.state.vidMute} mode={1} />
                </View>
            )
        } else {
            console.log("both")
            return (
                <View style={{ flex: 1 }}>
                    <AgoraView style={styles.localView} showLocalVideo={!this.state.vidMute} mode={1} />
                    <AgoraView mode={1} key={this.state.peerIds[0]} style={styles.localView} remoteUid={this.state.peerIds[0]} />
                </View>
            )
        }
    }

    render() {
        return (
            <View
                activeOpacity={1}
                onPress={this.toggleHideButtons}
                style={styles.container}
            >
                <View style={{ position: 'absolute', left: 0, top: 20, right: 0, width: '10%', height: '10%', backgroundColor: 'black' }}>
                    {this.renderCallState()}
                </View>
                {
                    this.state.callState === 2 && (
                        <AgoraView style={styles.localView} showLocalVideo={true} mode={1} />
                    )
                }
                {
                    this.state.callState !== 2 && (
                        <View style={{ flex: 1 }}>
                            <AgoraView style={styles.localView} showLocalVideo={!this.state.vidMute} mode={1} />
                            <AgoraView mode={1} key={this.state.peerIds[0]} style={styles.localView} remoteUid={this.state.peerIds[0]} />
                            <Text>both joined</Text>
                        </View>
                    )
                }
                {/* <AgoraView style={styles.localView} showLocalVideo={true} mode={1} /> */}
                {/* <AgoraView mode={1} key={this.state.peerIds[0]} style={styles.localView} remoteUid={this.state.peerIds[0]} /> */}
                <View style={styles.buttonBar} >
                    {
                        !this.state.incomingCall && (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: this.state.audMute ? 'mic' : 'mic-off', type: 'MaterialCommunityIcons' }}
                                        onPress={() => this.toggleAudio()} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: 'phone-off', type: 'feather' }}
                                        onPress={() => { this.endCall() }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: this.state.vidMute ? 'camera' : 'camera-off', type: 'feather' }}
                                        onPress={() => this.toggleVideo()} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: 'camera-switch', type: 'MaterialCommunityIcons' }}
                                        onPress={() => this.switchCamera()} />
                                </View>
                            </View>
                        )
                    }
                    {
                        this.state.incomingCall && (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: 'phone', type: 'feather' }}
                                        onPress={() => { this.acceptCall() }} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: 'phone-off', type: 'feather' }}
                                        onPress={() => { this.endCall() }} />
                                </View>
                            </View>
                        )
                    }
                </View>
            </View >
        )
    }
}
const mapStateToProps = (state) => {
    const { auth, app, chat } = state;
    const { user } = auth;
    const { selectedChat } = app;
    const peer = chat['consultant_profiles'][selectedChat.chatId] || chat['user_profiles'][selectedChat.chatId]
    return { user, peer }
}
export default connect(mapStateToProps, actions)(VideoScreen);