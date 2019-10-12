import React from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    Dimensions,
    Platform,
    BackHandler,
} from 'react-native'
import { RTCView } from 'react-native-webrtc';
import { connect } from 'react-redux'
import ToolBar from './ToolBar'
import CallingLoader from './CallingLoader'
import * as actions from '../../../appstate/actions';

import InCallManager from 'react-native-incall-manager';
import VideoTimeout from './VideoTimeout';
import VideoTimer from './VideoTimer';
import firebase from 'react-native-firebase';
import { tsThisType } from '@babel/types';


const [screenH, screenW] = [
    Dimensions.get('window').height,
    Dimensions.get('window').width
]
export class VideoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    state = {
        disableCall: true,
        minutes: 0,
        seconds: 0,
        callReceived: false,
        stopCall: false,
    }

    componentDidMount() {
        const { userMode, user, consultationDetails, callInProgress, chatId } = this.props;
        console.log("Props", this.props)
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if (callInProgress) {
                return false;
            } else {
                this.props.navigation.goBack();
                return true;
            }
        });
        if (userMode) {
            if (!consultationDetails) {
                this.setState({
                    callReceived: true
                })
            } else {

                var remainingMins = parseInt(user.wallet / consultationDetails.videoPrice);
                if (remainingMins > 0)
                    this.setState({
                        disableCall: false,
                        remainingMinutes: remainingMins
                    })
            }
        }
        if (callInProgress) {
            this.timer = setInterval(() => {
                console.log("Timer has started")
                this.setState({
                    seconds: this.state.seconds + 1
                })
                if (this.state.seconds >= 60) {
                    if (userMode && !this.state.callReceived) {
                        firebase.database().ref('moneyTransfer').push({
                            from: user.uid,
                            to: chatId,
                            value: consultationDetails.videoPrice
                        })
                    }

                    this.setState({
                        minutes: this.state.minutes + 1,
                        seconds: this.state.seconds - 60,
                        remainingMinutes: this.state.remainingMinutes - 1
                    })
                    if (this.state.remainingMinutes <= 0) {
                        this.setState({
                            stopCall: true,
                        })
                    }
                }
            }, 1000)
        } else if (!callInProgress) {
            console.log("Timer has stopped")
            if (this.timer)
                clearInterval(this.timer);
        }
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    clearInterval = () => {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }

    render() {

        this.props.videoStreamsDataSource.map((item, i, arr) => {
            console.log("Item", item)
            InCallManager.setSpeakerphoneOn(true);
        });

        console.log("VideoStream data source", this.props.videoStreamsDataSource);
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar backgroundColor="black" barStyle="light-content" animated />
                <View removeClippedSubviews style={{ flex: 1, }}>
                    {
                        this.props.videoStreamsDataSource.map((item, i, arr) => (
                            <View style={styles.videoViewWrapper} key={i}>
                                <RTCView style={styles.videoView(arr.length)} mirror={true} key={item.userId} streamURL={item.stream.toURL()} />
                            </View>
                        ))
                    }
                </View>
                <CallingLoader />
                {
                    (this.props.userMode && !this.state.callReceived) && (
                        <VideoTimeout remainingMinutes={this.state.remainingMinutes} />
                    )
                }
                <VideoTimer minutes={this.state.minutes} seconds={this.state.seconds} />
                <ToolBar clearInterval={this.clearInterval} disableCall={this.state.disableCall} remainingMinutes={this.state.remainingMinutes} stopCall={this.state.stopCall} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    videoViewWrapper: {
        flex: 1,
        overflow: 'hidden'
    },
    videoView: count => Platform.select({
        ios: {
            height: screenH,
            width: screenW,
            top: count === 2 ? -screenH / 4 : 0,
            backgroundColor: 'black'
        },
        android: {
            flex: 1,
            backgroundColor: 'black'
        }
    })
})

const mapStateToProps = (state) => {
    console.log("State", state);
    const { app, auth, chat, connectycube_videosession } = state;
    const { chatId, userMode } = app.selectedChat;
    var consultationDetails = {};
    const { consultation_details } = chat;
    if (userMode) {
        consultationDetails = consultation_details[chatId]
    }
    // convert map to array
    let dataSource = [];
    console.log("State in index", state)

    Object.keys(connectycube_videosession.videoStreams).map(userId => {
        dataSource.push({ userId: userId, stream: connectycube_videosession.videoStreams[userId] })
    });

    return {
        videoStreamsDataSource: dataSource,
        consultationDetails,
        user: auth.user,
        userMode,
        callInProgress: app.callInProgress,
        chatId
    }
}

export default connect(mapStateToProps, actions)(VideoScreen)
