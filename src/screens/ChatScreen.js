import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import * as actions from '../appstate/actions';
import styles from '../Constants/Styles';
import { ChatScreenBody } from '../components/ScreenParts/ChatScreenBody';
import strings from '../Constants/Strings';

class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.getParam('title')}`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    updateMessages = (newMessage, chatId, userMode) => {
        this.props.updateMessages(newMessage, chatId, userMode)
    }

    render() {
        const { messages, user, chatId, userMode, imagesExist, imageArray } = this.props;
        console.log("Image array", imageArray)
        if (!imagesExist) {
            this.props.saveImages(chatId, userMode, imageArray)
        }
        return (
            <View style={[styles.fullScreen, { margin: 0 }]}>
                <ChatScreenBody messages={messages} user={user} chatId={chatId} userMode={userMode} sendMessage={this.props.sendMessage} updateMessages={this.updateMessages} imageArray={imageArray} />
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("State", state);
    const { app, auth, chat } = state;
    const { chatId, userMode } = app.selectedChat;
    var selectedChat = {};
    if (userMode) {
        const { user_chats } = chat;
        for (var i = 0; i < user_chats.length; i++) {
            if (user_chats[i].user.uid === chatId) {
                selectedChat = user_chats[i];
            }
        }
    } else {
        const { consultant_chats } = chat;
        for (var i = 0; i < consultant_chats.length; i++) {
            if (consultant_chats[i].user.uid === chatId) {
                selectedChat = consultant_chats[i];
            }
        }
    }
    var chatArray = []
    if (selectedChat.chat) {
        var lastMessage = selectedChat.chat.lastMessage;
        delete selectedChat.chat.lastMessage;
        chatArray = Object.keys(selectedChat.chat).map(key => (selectedChat.chat[key]))
    }
    if (lastMessage)
        selectedChat.chat.lastMessage = lastMessage;
    console.log("Chat array before,", chatArray)
    chatArray.unshift({ _id: 1, text: strings.AGREEMENT_POLICY, createdAt: '1970-01-01 00:00:00 UTC+00', system: true })
    var index = 1;
    var imageArray = [];
    for (var i = 0; i < chatArray.length; i++) {
        if (chatArray[i].image) {
            var image = chatArray[i].image;
            console.log("image here ", image)
            if (!image.url) {
                chatArray[i].image = {
                    url: image,
                    index: index
                }
            }
            index++;
            imageArray.push(chatArray[i].image)
        }
    }
    console.log("Chat array after,", chatArray)
    console.log("Image array after,", imageArray)

    if (!app.selectedChat.images) {
        console.log("Images not  exists", imageArray)
        return ({ messages: chatArray, user: auth.user, chatId, userMode, imageArray, imagesExist: false })
    } else {
        console.log("Images exists", app.selectedChat.images)
        return ({ messages: chatArray, user: auth.user, chatId, userMode, imageArray: app.selectedChat.images, imagesExist: true })
    }
}

export default connect(mapStateToProps, actions)(ChatScreen);