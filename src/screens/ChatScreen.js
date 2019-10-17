import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../appstate/actions';
import styles from '../Constants/Styles';
import { ChatScreenBody } from '../components/ScreenParts/ChatSceen/ChatScreenBody';
import strings from '../Constants/Strings';
import { Button } from 'react-native-elements';
import ChatScreenWalletInfo from '../components/ScreenParts/ChatSceen/ChatScreenWalletInfo';

class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.getParam('title')}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
        headerRight: (
            <View>
                <Button title='Video' type='clear' onPress={() => {
                    navigation.navigate('VideoScreen')
                }} />
            </View>
        )
    });

    state = {
        remaining: 0,
        wallet: 0,
        composerClosed: false
    }

    updateMessages = (newMessage, chatId, userMode) => {
        this.props.updateMessages(newMessage, chatId, userMode)
    }

    componentDidMount = () => {
        const { user, userMode, consultationDetails } = this.props;
        console.log("Props", this.props)
        if (userMode && consultationDetails.type === 'session') {
            var walletChar = parseInt(user.wallet / consultationDetails.textPrice)
            var remaining = 0;

            if (walletChar >= 1)
                remaining = walletChar * 300 + consultationDetails.freeChars - consultationDetails.counter;
            else
                remaining = consultationDetails.freeChars - consultationDetails.counter;
            composerClosed = false;
            if (remaining <= 0)
                composerClosed = true;
            this.setState({ wallet: user.wallet, remaining, composerClosed });
        }
    }

    saveUserMessages = (message) => {
        console.log("MEssage in SUM", message);
        this.props.saveUserMessages(message);
    }

    saveConsultantMessages = (message) => {
        console.log("MEssage in SCM", message);
        this.props.saveConsultantMessages(message);
    }

    render() {
        const { messages, user, chatId, userMode, imagesExist, imageArray, consultationDetails } = this.props;
        if (!imagesExist) {
            this.props.saveImages(chatId, userMode, imageArray)
        }
        return (
            <View style={[styles.fullScreen, { margin: 0 }]}>
                {
                    userMode && consultationDetails.type === 'session' && (
                        <ChatScreenWalletInfo wallet={this.props.user.wallet} remaining={this.state.remaining} />
                    )
                }
                <ChatScreenBody changeRemaining={this.changeRemaining} remaining={this.state.remaining} messages={messages} user={user} closeComposer={this.closeComposer} composerClosed={this.state.composerClosed}
                    chatId={chatId} userMode={userMode} sendMessage={this.props.sendMessage} saveUserMessages={this.saveUserMessages} saveConsultantMessages={this.saveConsultantMessages} imageArray={imageArray} />
            </View>
        )
    }

    closeComposer = () => {
        this.setState({
            composerClosed: true
        })
    }

    changeRemaining = (length) => {
        const { chatId } = this.props
        this.props.incrementCharCounter(length, chatId);
        this.setState({
            remaining: parseInt(this.state.remaining) - parseInt(length)
        })
        return new Promise((resolve, reject) => {
            if (this.state.remaining <= 0) {
                reject({ status: 'failed', length: 0 - this.state.remaining })
            } else {
                resolve({ status: 'success' })
            }
        })
    }
}


const mapStateToProps = (state) => {
    console.log("State", state);
    const { app, auth, chat } = state;
    const { chatId, userMode } = app.selectedChat;
    var selectedChat = {
        chat: []
    };
    var consultationDetails = {};
    const { consultation_details } = chat;
    if (userMode) {
        const { user_chats } = chat;
        if (user_chats[chatId])
            selectedChat.chat = user_chats[chatId].messages;
        consultationDetails = consultation_details[chatId]
    } else {
        const { consultant_chats } = chat;
        if (consultant_chats[chatId])
            selectedChat.chat = consultant_chats[chatId].messages;
    }
    if (selectedChat.chat[selectedChat.chat.length - 1] && selectedChat.chat[selectedChat.chat.length - 1]._id !== 1)
        selectedChat.chat.push({ _id: 1, text: strings.AGREEMENT_POLICY, createdAt: '1970-01-01 00:00:00', system: true })
    var index = 1;
    var imageArray = [];
    console.log("Selected chat", selectedChat)
    for (var i = 0; i < selectedChat.chat.length; i++) {
        var message = selectedChat.chat[i]
        if (message.image) {
            var image = message.image;
            if (!image.url) {
                message.image = {
                    url: image,
                    index: index
                }
            }
            index++;
            imageArray.push(message.image)
        }
    }

    if (!app.selectedChat.images) {
        return ({ messages: selectedChat.chat, user: auth.user, chatId, userMode, imageArray, imagesExist: false, consultationDetails })
    } else {
        return ({ messages: selectedChat.chat, user: auth.user, chatId, userMode, imageArray: app.selectedChat.images, imagesExist: true, consultationDetails })
    }
}

export default connect(mapStateToProps, actions)(ChatScreen);