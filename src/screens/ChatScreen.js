import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { connect } from 'react-redux';


import * as actions from '../appstate/actions';
import styles from '../Constants/Styles';
import { ChatScreenBody } from '../components/ScreenParts/ChatSceen/ChatScreenBody';
import strings from '../Constants/Strings';
import { Button } from 'react-native-elements';
import ChatScreenWalletInfo from '../components/ScreenParts/ChatSceen/ChatScreenWalletInfo';
import colors from '../Constants/Colors';
import firebase from 'react-native-firebase';

class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
        // title: `${navigation.getParam('title')}`,
        // headerTitleStyle: { textAlign: 'center', alignSelf: 'center', color: 'white' },
        // headerStyle: {
        //     backgroundColor: colors.IOS_BLUE,
        // },
        // headerTintColor: 'white',
        // headerRight: (
        //     <View style={{ flexDirection: 'row' }}>
        //         <Button icon={{ name: 'phone', type: 'feather', color: 'white', size: 24 }} type='clear' onPress={async () => {
        //             navigation.navigate('AudioScreen')
        //         }} />
        //         <Button icon={{ name: 'video', type: 'feather', color: 'white', size: 24 }} type='clear' onPress={() => navigation.navigate("VideoScreen")} />
        //     </View>
        // )
    });

    state = {
        remaining: 0,
        composerClosed: false
    }

    updateMessages = (newMessage, chatId, userMode) => {
        this.props.updateMessages(newMessage, chatId, userMode)
    }

    componentDidMount = () => {
        const { userMode, user, chatId } = this.props
        this.props.resetUnread(userMode, user.uid, chatId);
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        const { user, userMode, consultationDetails } = nextProps
        var consultationType = consultationDetails.type
        if (userMode && consultationType === 'session') {
            var walletChar = parseInt(user.wallet / parseInt(consultationDetails.textPrice))
            var remaining = 0;
            remaining = parseInt(walletChar * 300) + parseInt(consultationDetails.freeChars) - parseInt(consultationDetails.counter);
            composerClosed = false;
            if (remaining <= 0)
                composerClosed = true;
            return ({ remaining })
        }
        return prevState
    }

    saveUserMessages = (message) => {
        console.log("MEssage in SUM", message);
        this.props.saveUserMessages(message);
    }

    saveConsultantMessages = (message) => {
        console.log("MEssage in SCM", message);
        this.props.saveConsultantMessages(message);
    }

    startSubscription = () => {
        Alert.alert(
            'Abonelik Başlat',
            'Abonelik başlatınca cüzdanınınzdan tam ücret tutarında kredi düşürülecektir',
            [
                {
                    text: 'Vazgeç',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Başlat',
                    onPress: () => {
                        const { consultationDetails, user } = this.props;
                        if (user.wallet >= consultationDetails.subscriptionPrice)
                            this.props.startSubscription(this.props.user.uid, this.props.chatId);
                        else {
                            Alert.alert(
                                'Yetersiz kredi',
                                "Cüzdanınızda yeterli kredi bulunmamaktadır",
                                [
                                    {
                                        text: 'Kapat',
                                        onPress: () => { },
                                        style: 'cancel'
                                    },
                                    {
                                        text: 'Kredi al',
                                        onPress: () => {
                                            this.props.navigation.navigate("WalletScreen");
                                        }
                                    }
                                ]
                            )
                        }
                    }
                },
            ],
            { cancelable: false }
        )
    }

    cancelSubscription = () => {
        Alert.alert(
            'Aboneliği bitir',
            'Aboneliğinizi yeniden başlatmak isterseniz tam ücreti yeniden ödeyeceksiniz',
            [
                {
                    text: 'Vazgeç',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Bitir',
                    onPress: () => {
                        this.props.cancelSubscription(this.props.user.uid, this.props.chatId);
                    }
                },
            ],
            { cancelable: false }
        )
    }

    makeCall = (callType) => {
        const { user, userMode, consultationDetails } = this.props
        var consultationType = consultationDetails.type;
        if (callType === 'audio') {
            if (userMode && consultationType === 'session') {
                if (user.wallet <= 0) {
                    Alert.alert(
                        'Yetersiz Kredi',
                        'Sesli arama yapmak için yeterli krediniz yok.',
                        [
                            {
                                text: 'Tamam',
                                onPress: () => { },
                                style: 'cancel',
                            },
                            {
                                text: 'Kredi al',
                                onPress: () => {
                                    this.props.navigation.navigate("WalletScreen");
                                }
                            },
                        ]
                    )
                } else {
                    this.props.navigation.navigate("AudioScreen", {
                        userMode
                    })
                }
            }
            else {
                this.props.navigation.navigate("AudioScreen")
            }
        } else if (callType === 'video') {
            if (userMode && consultationType === 'session') {
                if (user.wallet <= 0) {
                    Alert.alert(
                        'Yetersiz Kredi',
                        'Görüntülü arama yapmak için yeterli krediniz yok.',
                        [
                            {
                                text: 'Tamam',
                                onPress: () => { },
                                style: 'cancel',
                            },
                            {
                                text: 'Kredi al',
                                onPress: () => {
                                    this.props.navigation.navigate("WalletScreen");
                                }
                            },
                        ]
                    )
                } else {
                    this.props.navigation.navigate("VideoScreen", {
                        userMode
                    })
                }
            }
            else {
                this.props.navigation.navigate("VideoScreen")
            }
        }
    }

    render() {
        console.log("Chat Screen Rendered", this.props);
        const { messages, user, chatId, userMode, imagesExist, imageArray, consultationDetails } = this.props;
        if (!imagesExist) {
            this.props.saveImages(chatId, userMode, imageArray)
        }
        return (
            <View style={[styles.fullScreen, { margin: 0 }]}>
                <View style={styles.customHeader}>
                    <Button type='clear' icon={{ name: 'arrow-back', type: 'MaterialIcons', color: 'white' }}
                        onPress={() => { this.props.navigation.goBack() }} />
                    <Text style={{ marginLeft: 15, color: 'white', fontSize: 18 }}>{this.props.peer.name}</Text>
                    <View style={{ position: 'absolute', right: 0 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Button icon={{ name: 'phone', type: 'feather', color: 'white', size: 24 }} type='clear' onPress={async () => this.makeCall('audio')} />
                            <Button icon={{ name: 'video', type: 'feather', color: 'white', size: 24 }} type='clear' onPress={() => this.makeCall('video')} />
                        </View>
                    </View>
                </View>
                {
                    userMode && (
                        <ChatScreenWalletInfo user={this.props.user} remaining={this.state.remaining} consultationType={consultationDetails.type} status={consultationDetails.status} startSubscription={this.startSubscription} cancelSubscription={this.cancelSubscription} />
                    )
                }
                <ChatScreenBody changeRemaining={this.changeRemaining} remaining={this.state.remaining} messages={messages} user={user} closeComposer={this.closeComposer} composerClosed={this.state.composerClosed}
                    chatId={chatId} userMode={userMode} sendMessage={this.props.sendMessage} saveUserMessages={this.saveUserMessages} saveConsultantMessages={this.saveConsultantMessages} imageArray={imageArray}
                    consultationType={consultationDetails.type} status={consultationDetails.status} />
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
    componentWillUnmount() {
        const { userMode, user, chatId } = this.props
        this.props.resetUnread(userMode, user.uid, chatId);
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

    const peer = chat['consultant_profiles'][app.selectedChat.chatId] || chat['user_profiles'][app.selectedChat.chatId]

    if (!app.selectedChat.images) {
        console.log("messages updated")
        return ({ messages: selectedChat.chat, user: auth.user, chatId, userMode, peer, imageArray, imagesExist: false, consultationDetails })
    } else {
        console.log("messages updated 1")
        return ({ messages: selectedChat.chat, user: auth.user, chatId, userMode, peer, imageArray: app.selectedChat.images, imagesExist: true, consultationDetails })
    }
}

export default connect(mapStateToProps, actions)(ChatScreen);