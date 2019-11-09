import React, { Component } from 'react';
import { View, FlatList, TouchableOpacity } from 'react-native'
import styles from '../../Constants/Styles';
import { HomeScreenDivider } from '../common/Buttons'
import { ChatItem } from '../ListItems/ChatItem';
import { Text } from 'react-native-elements';

export class HomeScreenBody extends Component {


    keyExtractor = (item) => {
        return item.user.uid;
    }

    renderChatItem = ({ item }) => {
        console.log("render chat item", item)
        return (
            <ChatItem unread={item.unreadCount} chat={item.chat} lastMessage={item.lastMessage} user={item.user} currentUser={this.props.user} onPress={this.props.onChatItemPress} />
        )
    }
    renderEmptyChatItem = () => {
        console.log("empty item")
        return (
            <View style={styles.screenCenter}>
                <Text>Danışmanlık almaya başlayın</Text>
            </View>
        )
    }

    renderChatList = () => {
        if (this.props.consultantsSelected) {
            return (
                <FlatList
                    data={this.props.user_chats}
                    renderItem={this.renderChatItem}
                    ListEmptyComponent={this.renderEmptyChatItem}
                    keyExtractor={this.keyExtractor}
                />
            )
        } else {
            return (
                <FlatList
                    data={this.props.consultant_chats}
                    renderItem={this.renderChatItem}
                    ListEmptyComponent={this.renderEmptyChatItem}
                    keyExtractor={this.keyExtractor}
                />
            )
        }
    }

    render() {
        return (
            <View style={[styles.fullScreen, { margin: 0 }]}>
                {this.props.user.isProvider && (
                    <HomeScreenDivider changeTab={this.props.changeTab} consultantsSelected={this.props.consultantsSelected} user={this.props.user} />
                )
                }
                {this.renderChatList()}
            </View>
        )
    }
}