import React, { Component } from 'react';
import { View, FlatList } from 'react-native'
import styles from '../../Constants/Styles';
import { HomeScreenDivider } from '../common/Buttons'
import { ChatItem } from '../ListItems/ChatItem';

export class HomeScreenBody extends Component {


    keyExtractor = (item) => {
        return item.user.uid
    }

    renderChatItem = ({ item }) => {
        return <ChatItem chat={item.chat} user={item.user} currentUser={this.props.user}/>
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
        console.log("HSB", this.props.consultant_chats)
        return (
            <View style={styles.fullScreen}>
                <HomeScreenDivider changeTab={this.props.changeTab} consultantsSelected={this.props.consultantsSelected} user={this.props.user} />
                {this.renderChatList()}
            </View>
        )
    }
}