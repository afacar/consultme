import React, { Component } from 'react';
import { View, NativeModules, Text, Alert } from 'react-native';
import { RtcEngine } from 'react-native-agora';
import InCallManager from 'react-native-incall-manager';

import * as actions from '../appstate/actions';
import { connect } from 'react-redux';


import styles from '../Constants/Styles';
import { Button, Image } from 'react-native-elements';
import firebase from 'react-native-firebase';

const { Agora } = NativeModules;

const {
    FPS30,
    AudioProfileDefault,
    AudioScenarioDefault,
} = Agora

class AudioScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    state = {
        uid: Math.floor(Math.random() * 100),
        peerIds: [],
        appid: 'a0ee6b5742ca4cfe84d1e9fa4c97b946',
        channelName: this.props.navigation.getParam('incomingCall', undefined) ? this.props.navigation.getParam('incomingCall') : this.props.user.uid + "-" + this.props.peer.uid,
        audMute: false,
        joinSucceed: false,
        callState: 'Aranıyor',
        remaining: this.props.navigation.getParam('incomingCall', undefined) ? this.props.navigation.getParam('remaining', undefined) : 0,
        timer: 0,
        incomingCall: false,
        userMode: this.props.navigation.getParam('userMode', false)
    };

    componentDidMount() {
        InCallManager.stop();
        var userMode = this.props.navigation.getParam('userMode', false)
        const { user, peer } = this.props;
        if (!this.props.navigation.getParam('incomingCall', undefined)) {
            this.props.sendCall(user.uid, userMode, peer.uid, 'audio', async (result) => {
                if (result.code === 1) {
                    const config = {
                        appid: this.state.appid,
                        channelName: this.state.channelName,
                        audioProfile: AudioProfileDefault,
                        audioScenario: AudioScenarioDefault
                    };
                    await RtcEngine.init(config)
                    await RtcEngine.joinChannel(this.state.channelName, this.state.uid);
                    RtcEngine.enableAudio();
                    InCallManager.start({ media: 'audio', ringback: '_DTMF_' })

                    RtcEngine.on('userJoined', (data) => {
                        console.log("User joined", data)
                        const { peerIds } = this.state;
                        console.log("Peer ids ", peerIds)
                        if (peerIds.indexOf(data.uid) === -1) {
                            InCallManager.stopRingback();
                            this.setState({
                                peerIds: [...this.state.peerIds, data.uid],
                            })
                            if (userMode) {
                                var remaining = result.remaining;
                                this.setState({
                                    remaining: remaining,
                                    price: result.price
                                })
                                this.timerInterval = setInterval(() => {
                                    var { remaining, callState, timer } = this.state;
                                    console.log("remaining", remaining)
                                    callState = this.formatTimer(remaining);
                                    this.setState({
                                        remaining: remaining - 1,
                                        timer: timer + 1,
                                        callState
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
                            } else {

                            }
                        }
                    })
                    RtcEngine.on('joinChannelSuccess', (data) => {
                        this.setState({
                            joinSucceed: true
                        })
                    })
                    RtcEngine.on('userOffline', (data) => {
                        InCallManager.stop({ busytone: '_DTMF_' });
                        this.setState({
                            peerIds: this.state.peerIds.filter(uid => uid !== data.uid),
                        })
                        this.endCall();
                    })

                } else if (result === 0) {
                    this.setState({
                        callState: 'Bağlantınızı Kontrol Edin'
                    })
                } else if (result === -1) {
                    this.setState({
                        callState: 'Kullanıcı başka birisiyle görüşüyor'
                    })
                }
            });
        } else {
            this.setState({
                incomingCall: true,
                callState: 'Arıyor'
            })
        }
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

    toggleAudio = () => {
        let mute = this.state.audMute
        RtcEngine.muteLocalAudioStream(!mute);
        this.setState({
            audMute: !mute
        })
    }

    acceptCall = async () => {
        const config = {
            appid: this.state.appid,
            channelName: this.state.channelName,
            audioProfile: AudioProfileDefault,
            audioScenario: AudioScenarioDefault
        };
        console.log('Before init')
        await RtcEngine.init(config)
        console.log('Before join channel')
        console.log("channel name\n", this.state.channelName);
        await RtcEngine.joinChannel(this.state.channelName, this.state.uid);
        var userMode = this.props.navigation.getParam('userMode', false)

        console.log('Before listeners')
        RtcEngine.on('joinChannelSuccess', (data) => {
            console.log('Join channel success')
            InCallManager.stopRingtone();
            this.setState({
                joinSucceed: true,
                incomingCall: false,
            })
            this.setState({
                price: this.props.navigation.getParam('price', 0)
            })
            this.timerInterval = setInterval(() => {
                var { remaining, callState, timer } = this.state;
                console.log("remaining", remaining)
                callState = this.formatTimer(remaining);
                this.setState({
                    remaining: remaining - 1,
                    timer: timer + 1,
                    callState
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
    }

    endCall = () => {
        InCallManager.stop();
        const { user, peer } = this.props;
        const { timer, price } = this.state;
        var value = parseFloat(timer) / parseFloat(60);
        value *= price;
        console.log("value", value);
        console.log("timer", timer);
        console.log("price", price);

        if (this.state.joinSucceed) {
            this.setState({
                joinSucceed: false
            })
            RtcEngine.leaveChannel().then(_ => {
                RtcEngine.destroy();
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

    componentWillUnmount = () => {
        if (this.state.joinSucceed)
            this.endCall();
    }

    peerClick = (data) => {
        let peerIdToSwap = this.state.peerIds.indexOf(data);
        this.setState(prevState => {
            let currentPeers = [...prevState.peerIds];
            let tmp = currentPeers[peerIdToSwap];
            currentPeers[peerIdToSwap] = currentPeers[0];
            currentPeers[0] = tmp;
            return { peerIds: currentPeers }
        })
    }

    audioView() {
        return (
            <View style={{ flex: 1 }}>
                <View style={styles.customHeader}>
                    <Button type='clear' icon={{ name: 'arrow-back', type: 'MaterialIcons', color: 'white' }}
                        onPress={() => { this.props.navigation.goBack() }} />
                    <Text style={{ marginLeft: 30, color: 'white', fontSize: 18 }}>{this.props.peer.name + " " + this.state.callState}</Text>
                </View>
                <View style={{ flex: 1, marginVertical: 50 }}>
                    <Image style={{ height: '100%', width: '100%' }} source={{ uri: this.props.peer.photoURL }} />
                </View>
                <View style={styles.buttonBar} >
                    {
                        !this.state.incomingCall && (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: this.state.audMute ? 'mic' : 'mic-off', type: 'MaterialCommunityIcons' }}
                                        titleStyle={{ color: 'white' }}
                                        onPress={() => this.toggleAudio()} />
                                </View>
                                <View style={{ flex: 1 }}>
                                    <Button type='clear'
                                        icon={{ color: 'white', name: 'phone-off', type: 'feather' }}
                                        onPress={() => { this.endCall() }} />
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
            </View>
        )
    }

    render() {
        return this.audioView();
    }
}
const mapStateToProps = (state) => {
    // TODO when user calls another user put it into firebase send notification get selected chat id. 
    const { auth, app, chat } = state;
    const { user } = auth;
    const { selectedChat } = app;
    const peer = chat['consultant_profiles'][selectedChat.chatId] || chat['user_profiles'][selectedChat.chatId]
    console.log("peer", peer)
    return { user, peer }
}
export default connect(mapStateToProps, actions)(AudioScreen);