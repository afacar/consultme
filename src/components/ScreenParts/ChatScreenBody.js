import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Text, View, Image, Platform, Modal, BackHandler } from 'react-native';
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import { AudioUtils, AudioRecorder } from 'react-native-audio';


import AudioCard from '../common/AudioCard';
import styles from '../../Constants/Styles';
import { SignOutButton, SaveButton } from '../common/Buttons';
import { Button, Icon } from 'react-native-elements';
import Sound from 'react-native-sound';
import ImageViewerModal from '../Modals/ImageViewerModal';

export class ChatScreenBody extends Component {

    /*
        props ={
            messages: []
        }
        */

    state = {
        messages: [],
        images: [],
        imageIndex: 1,
        showImage: false,
        isNewMessage: false,
        chatId: null,
        userRole: null,
        isApproved: true,
        userIsTyping: false,
        hasPermission: false,
        startAudio: false,
        audioPlaying: false,
        fetchChats: false,
        audioSettings: {
            SampleRate: 22050,
            Channels: 1,
            AudioQuality: "High",
            AudioEncoding: "aac",
            MateringEnabled: true,
            IncludeBase64: true,
            AudioEncodingBitRate: 32000
        },
        showAnswers: false
    };

    componentDidMount() {
        console.log("messages", this.props.messages)
        console.log("images", this.props.imageArray)
    }

    // methods related to send message
    sendMessage = (messages) => {
        console.log("Message\n", messages);
        let messagesArray = [];

        for (let i = 0; i < messages.length; i++) {
            let message = messages[i];
            message.createdAt = new Date();
            if (!message._id)
                message._id = this.randIDGenerator();
            if (message.text)
                message._id = this.randIDGenerator();
            this.updateState(message);
            messagesArray.push(message);
            console.log("Messages before", this.props.messages);
        }
        const { chatId, user, userMode } = this.props;
        this.props.sendMessage(messagesArray, chatId, user, userMode);
    }

    randIDGenerator = () => {
        var date = new Date().getTime().toString();
        var randId = this.props.user.uid + date;
        return (randId);
    }

    updateState(message) {
        console.log('message in update state', message)
        this.props.updateMessages(message, this.props.chatId, this.props.userMode)
        this.forceUpdate();
    }


    // This method determines the state whether to render camere, attach etc buttons
    changeTypeState = (text) => {
        var typing = false;
        if (text) {
            typing = true;
        }
        this.setState({
            userIsTyping: typing
        })
    }


    // render methods
    renderSend = (props) => {
        return (
            <Send {...props} containerStyle={{ justifyContent: "center" }}>
                <Icon
                style={{ fontSize: 19, color: 'blue', margin: 5 }}
                type={"font-awesome"}
                name = {"send"}>                   
                </Icon>
                
            </Send>
        );
    }

    renderAudio = (props) => {
        return !props.currentMessage.audio ? (
            <View />
        ) : (
                <AudioCard
                    id={props.currentMessage._id}
                    audio={props.currentMessage.audio}
                    createdAt={props.currentMessage.createdAt}
                />
            );
    };

    renderBubble = props => {
        if (props.currentMessage.audio) {
            return (
                <View>
                    {this.renderAudio(props)}
                </View>
            )
        } else {
            return (
                <View>
                    <Bubble {...props} />
                </View>
            );
        }
    };

    renderActions = (props) => {
        if (!this.state.userIsTyping) {
            return (
                <View style={{ width: '20%', flexDirection: 'row', alignItems: 'center' }}>
                    <View >
                        <TouchableOpacity onPress={this.openPicker}>
                            <Button type='clear' icon = {{type: 'antDesign', name: 'camera'}} onPress={this.openPicker} />
                        </TouchableOpacity>
                    </View>
                    <View  >
                        <TouchableOpacity onPress={this.handleAudio}>
                            <Button type='clear' icon = {{type: 'font-awesome', name: 'microphone'}} titleStyle={{ color: this.state.startAudio ? 'red' : 'blue' }} onPress={this.handleAudio} />
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    renderMessageImage = (props) => {
        console.log("Props", props)
        var { image } = props.currentMessage
        return (
            <TouchableOpacity onPress={() => this.openImage(image.index)}>
                <Image
                    source={{ uri: image.url }}
                    style={styles.chatMessageImage}
                />
            </TouchableOpacity>
        );
    }

    openImage = (index) => {
        console.log("Images", this.state.images + " index " + index);
        this.setState({
            showImage: true,
            currentIndex: index
        })
    }


    render() {
        var { messages, chatId, user } = this.props
        return (
            <View style={[styles.fullScreen, { margin: 5 }]}>
                <GiftedChat
                    key={chatId}
                    messages={messages}
                    locale={'tr'}
                    onSend={(message) => this.sendMessage(message)}
                    onInputTextChanged={(text) => { this.changeTypeState(text) }}
                    showUserAvatar={false}
                    user={{
                        _id: user.uid,
                        name: user.name,
                        avatar: user.photoURL,
                    }}
                    placeholder='Mesaj yazın...'
                    renderSend={this.renderSend}
                    renderBubble={this.renderBubble}
                    renderActions={this.renderActions}
                    // onPressAvatar={this.onPressAvatar}
                    renderMessageImage={this.renderMessageImage}
                />
                <ImageViewerModal images={this.props.imageArray} currentIndex={this.state.currentIndex} changeImageViewState={this.changeImageViewState} showImage={this.state.showImage} />
            </View>
        )
    }

    changeImageViewState = (state) => {
        this.setState({
            showImage: state
        })
    }

    openPicker = () => {

        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Fotoğraf Seç',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                allowsEditing: true,
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                const { user } = this.props
                const message = {
                    text: "",
                    user: {
                        _id: user.uid,
                        name: user.name,
                        avatar: user.photoURL
                    },
                    image: response.uri.toString(),
                    path: response.path.toString()
                };
                this.sendMessage([message]);
            }
        });
    }

    handleAudio = async () => {
        if (!this.state.startAudio) {
            var id = this.randIDGenerator();
            this.setState({
                lastAudioID: id
            })
            this.setState({
                startAudio: true
            });
            const audioPath = `${
                AudioUtils.DocumentDirectoryPath}/${id}.aac`;
            await AudioRecorder.prepareRecordingAtPath(
                audioPath,
                this.state.audioSettings
            );
            await AudioRecorder.startRecording();

        } else {
            this.setState({
                startAudio: false
            })
            var filePath = await AudioRecorder.stopRecording();
            AudioRecorder.onFinished = data => {
                console.log("data", data)
                var audioPath = data.audioFileURL;
                console.log("audioPath", audioPath);
                if (Platform.OS == 'ios') {
                    filePath = audioPath
                }
                console.log("FilePath", filePath);
                var { user } = this.props
                const message = {
                    text: '',
                    audio: filePath,
                    audioPath: data.audioFileURL,
                    _id: this.state.lastAudioID,
                    image: '',
                    user: {
                        _id: user.uid,
                        name: user.name,
                        avatar: user.photoURL
                    },
                }
                this.sendMessage([message]);
            };
        }
    }

    closeImage = () => {
        console.log("Close image")
        this.setState({ showImage: false })
    }

    componentWillUnmount = () => {
        this.closeImage();
    }
}