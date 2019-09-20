import React from 'react'
import {
    StyleSheet,
    View,
    StatusBar,
    Dimensions,
    Platform,
    Text
} from 'react-native'
import { RTCView } from 'react-native-webrtc';
import { connect } from 'react-redux'
import ToolBar from './ToolBar'
import CallingLoader from './CallingLoader'

import InCallManager from 'react-native-incall-manager';


const [screenH, screenW] = [
    Dimensions.get('window').height,
    Dimensions.get('window').width
]
export class VideoScreen extends React.Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    render() {

        this.props.videoStreamsDataSource.map((item, i, arr) => {
            console.log("Item", item)
            InCallManager.setSpeakerphoneOn(true);
        });

        console.log("VideoStream data source", this.props.videoStreamsDataSource);
        return (
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                <StatusBar backgroundColor="black" barStyle="light-content" animated />
                <View removeClippedSubviews style={{ flex: 1, overflow: 'hidden' }}>
                    {
                        this.props.videoStreamsDataSource.map((item, i, arr) => (
                            <View style={styles.videoViewWrapper} key={i}>
                                <RTCView style={styles.videoView(arr.length)} mirror={true} key={item.userId} streamURL={item.stream.toURL()} />
                            </View>
                        ))
                    }
                </View>
                <CallingLoader />
                <ToolBar />
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
    // convert map to array
    let dataSource = [];
    console.log("State in index", state)

    Object.keys(state.connectycube_videosession.videoStreams).map(userId => {
        dataSource.push({ userId: userId, stream: state.connectycube_videosession.videoStreams[userId] })
    });

    return {
        videoStreamsDataSource: dataSource
    }
}

export default connect(mapStateToProps, null)(VideoScreen)
