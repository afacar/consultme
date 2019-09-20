import React from 'react'
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import {
	userIsCalling,
	callInProgress,
	videoSessionObtained,
	localVideoStreamObtained,
	clearVideoSession,
	clearVideoStreams,
	muteAudio,
	setMediaDevices
} from '../../../appstate/actions/connectycube_videosession';
import CallingService from '../services/CallingService'

export class ToolBar extends React.Component {

	initiateCall() {
		console.log("Initiate call called")
		CallingService.createVideoSession(this.props.opponentsIds).then(session => {
			this.props.videoSessionObtained(session)
			console.log("Initiate call called 1 session obtained ", session)

			CallingService.getVideoDevices()
				.then(this.props.setMediaDevices);
			console.log("Initiate call called 2")

			CallingService.getUserMedia(session)
				.then(stream => {
					console.log("Initiate call called 3")
					this.props.localVideoStreamObtained(stream);
					console.log("Initiate call called 4")
					this.props.userIsCalling(true);
					console.log("Initiate call called 5")
					CallingService.initiateCall(this.props.videoSession);
					console.log("Initiate call called 6")
				})
				.catch(err => {
					console.error("getUserMedia err" + err);
				});
		});
	}

	stopCall() {
		this.props.userIsCalling(false);
		this.props.callInProgress(false);

		CallingService.finishCall(this.props.videoSession);

		this.props.clearVideoSession();
		this.props.clearVideoStreams();
	}

	switchCamera() {
		CallingService.switchCamera(this.props.localVideoStream);
	}

	muteUnmuteAudio() {
		if (this.props.audioMuted) {
			CallingService.unmuteAudio(this.props.videoSession);
			this.props.muteAudio(false);
		} else {
			CallingService.muteAudio(this.props.videoSession);
			this.props.muteAudio(true);
		}
	}

	render() {
		const isCallingOrCallInProgress = this.props.isCalling || this.props.activeCall;
		const isActiveCall = this.props.activeCall;
		const isTwoCamerasAvailable = this.props.mediaDevices.length > 1;

		const callStartStop = isCallingOrCallInProgress
			? <TouchableOpacity style={[styles.buttonContainer, styles.buttonCallEnd]} onPress={() => this.stopCall()}>
				<MaterialIcon name="call-end" size={38} color="white" />
			</TouchableOpacity>
			: <TouchableOpacity style={[styles.buttonContainer, styles.buttonCall]} onPress={() => this.initiateCall()}>
				<MaterialIcon name="call" size={38} color="white" />
			</TouchableOpacity>;

		return (
			<View style={styles.container}>
				{callStartStop}
				{isActiveCall &&
					<TouchableOpacity style={[styles.buttonContainer, styles.buttonMute]} onPress={() => this.muteUnmuteAudio()}>
						{this.props.audioMuted
							? <MaterialCommunityIcon name="microphone-plus" size={38} color="white" />
							: <MaterialCommunityIcon name="microphone-minus" size={38} color="white" />
						}
					</TouchableOpacity>
				}
				{isActiveCall &&
					isTwoCamerasAvailable &&
					<TouchableOpacity style={[styles.buttonContainer, styles.buttonSwitch]} onPress={() => this.switchCamera()}>
						<MaterialCommunityIcon name="video-switch" size={38} color="white" />
					</TouchableOpacity>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		height: 60,
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'row',
		zIndex: 100
	},
	buttonContainer: {
		height: 60,
		width: 60,
		borderRadius: 30,
		marginHorizontal: 15,
		justifyContent: 'center',
		alignItems: 'center'
	},
	buttonCall: {
		backgroundColor: 'forestgreen'
	},
	buttonCallEnd: {
		backgroundColor: 'red'
	},
	buttonMute: {
		backgroundColor: 'mediumblue',
		paddingTop: Platform.select({ android: 0, ios: 5 })
	},
	buttonSwitch: {
		backgroundColor: 'gold',
		paddingTop: Platform.select({ android: 0, ios: 5 })
	},
})

const mapStateToProps = (state) => {
	let jointProps = {};

	if (state.connectycube_videosession) {
		jointProps.videoSession = state.connectycube_videosession.videoSession;
		jointProps.isCalling = state.connectycube_videosession.userIsCalling;
		jointProps.activeCall = state.connectycube_videosession.callInProgress;
		jointProps.audioMuted = state.connectycube_videosession.audioMuted;
		jointProps.mediaDevices = state.connectycube_videosession.mediaDevices;
		jointProps.activeVideoDevice = state.connectycube_videosession.activeVideoDevice;
		jointProps.localVideoStream = state.connectycube_videosession.localVideoStream;
	}

	jointProps.opponentsIds = state.connectycube_user.opponentsIds;

	return jointProps;
}

const mapDispatchToProps = (dispatch) => ({
	userIsCalling: isCalling => dispatch(userIsCalling(isCalling)),
	callInProgress: inProgress => dispatch(callInProgress(inProgress)),
	videoSessionObtained: videoSession => dispatch(videoSessionObtained(videoSession)),
	clearVideoSession: () => dispatch(clearVideoSession()),
	clearVideoStreams: () => dispatch(clearVideoStreams()),
	localVideoStreamObtained: localStream => dispatch(localVideoStreamObtained(localStream)),
	muteAudio: mute => dispatch(muteAudio(mute)),
	setMediaDevices: mediaDevices => dispatch(setMediaDevices(mediaDevices))
})

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar)
