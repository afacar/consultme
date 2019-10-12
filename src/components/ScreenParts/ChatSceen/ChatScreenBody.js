import React, { Component } from 'react';
import { TouchableOpacity, Text, View, Image, Platform, } from 'react-native';
import { GiftedChat, Send, Bubble, Composer, InputToolbar } from 'react-native-gifted-chat';
import ImagePicker from 'react-native-image-picker';
import { AudioUtils, AudioRecorder } from 'react-native-audio';


import AudioCard from '../../common/AudioCard';
import styles from '../../../Constants/Styles';
import { Button } from 'react-native-elements';
import ImageViewerModal from '../../Modals/ImageViewerModal';

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
        const { chatId, user, userMode } = this.props;
        var success = true;
        var length = 0;
        var text = false;
        for (let i = 0; i < messages.length; i++) {
            let message = messages[i];
            // TODO convert audio messages into text and count length
            message.createdAt = new Date();
            if (!message._id)
                message._id = this.randIDGenerator();
            if (message.text) {
                message._id = this.randIDGenerator();
                if (userMode)
                    this.props.changeRemaining(message.text.length)
                        .then((result) => {
                            console.log("Promise result", result);
                            if (result.status !== 'success') {
                                success = false;
                                length = result.length;
                                text = true;
                            }
                        })
                        .catch((err) => {
                            console.log("Promise err", err);
                            success = false;
                            length = err.length;
                        })
            }
            if (message.audio && userMode) {
                this.props.changeRemaining(100)
                    .then((result) => {
                        console.log("Promise result", result);
                        if (result.status !== 'success') {
                            success = false;
                            length = result.length;
                            text = false;
                        }
                    })
                    .catch((err) => {
                        console.log("Promise err", err);
                        success = false;
                        length = err.length;
                    })
            }
            this.updateState(message);
            messagesArray.push(message);
            console.log("Messages before", this.props.messages);
        }
        if (success)
            this.props.sendMessage(messagesArray, chatId, user, userMode);
        else {
            this.props.sendMessage(messagesArray, chatId, user, userMode);
            this.props.closeComposer();
        }
    }

    randIDGenerator = () => {
        var date = new Date().getTime().toString();
        var randId = this.props.user.uid + date;
        return (randId);
    }

    updateState(message) {
        console.log('message in update state', message)
        const { userMode } = this.props;
        var msgObj = {};
        if (userMode) {
            console.log("User is user now")
            msgObj = {
                message,
                chatId: this.props.chatId,
                userMode: true
            }
            this.props.saveUserMessages(msgObj);
        } else {
            console.log("User is consultant now")
            msgObj = {
                message,
                chatId: this.props.chatId,
                userMode: false
            }
            this.props.saveConsultantMessages(msgObj);
        }
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
                <Text style={{ fontSize: 19, color: 'blue', margin: 5 }}>Gönder</Text>
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

    // renderComposer = props => {
    //     if (this.props.userMode && (this.props.composerClosed || this.props.remaining <= 0)) {
    //         return (
    //             <View style={{ width: '100%' }}>
    //                 <Text>Cüzdanınızda yeterli bakiye bulunmamaktadır</Text>
    //             </View>
    //         )
    //     } else {
    //         return (
    //             <View>
    //                 <Composer {...props} />
    //             </View>
    //         )
    //     }
    // }

    renderActions = (props) => {
        if (!this.state.userIsTyping) {
            return (
                <View style={{ width: '20%', flexDirection: 'row', alignItems: 'center' }}>
                    <View >
                        <TouchableOpacity onPress={this.openPicker}>
                            <Button type='clear' title='pic' onPress={this.openPicker} />
                        </TouchableOpacity>
                    </View>
                    <View  >
                        <TouchableOpacity onPress={this.handleAudio}>
                            <Button type='clear' title='mic' titleStyle={{ color: this.state.startAudio ? 'red' : 'blue' }} onPress={this.handleAudio} />
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

    renderInputToolbar = (props) => {
        const { userMode, remaining, composerClosed } = this.props;
        console.log("User mode", userMode);
        console.log("Remaining", remaining);
        console.log("composerClosed", composerClosed);

        if (!(userMode && (remaining <= 0 || composerClosed))) {
            return (
                <InputToolbar {...props} />
            )
        } else {
            return (
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>Cüzdanınızda yeterli bakiye bulunmamaktadır</Text>
                </View>
            )
        }
    }

    render() {
        console.log("CSB render")
        var { messages, chatId, user } = this.props
        return (
            <View style={[styles.fullScreen, { margin: 5 }]}>
                <GiftedChat
                    key={chatId}
                    inverted={true}
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
                    renderInputToolbar={this.renderInputToolbar}
                    scrollToBottom={true}
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
