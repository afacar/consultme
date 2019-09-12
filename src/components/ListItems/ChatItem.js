import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

export class ChatItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var { chat, user, currentUser } = this.props
    var title = user.name
    let subtitle = '';
    var lastMessage = ''
    if (chat)
      lastMessage = chat.lastMessage;
    if (lastMessage) {
      userName = (lastMessage.user._id === currentUser.uid) ? 'Siz: ' : user.name + ': ';
      // if (chat.unread > 0)
      //   badge = { value: theChat.unread, status: 'primary', textStyle: { fontSize: 15 } }
      if (lastMessage.text) {
        subtitle = userName + lastMessage.text;
        if (subtitle.length > 30)
          subtitle = subtitle.substring(0, 30) + '...'
      }
      else if (lastMessage.image)
        subtitle = userName + '📷 Resim';
      else if (lastMessage.audio)
        subtitle = userName + '🎤 Sesli mesaj';
    } else {
      subtitle = "Mesaj yok! İlk mesajı siz yazın.";
    }
    const createdAt = lastMessage.createdAt;

    // Create Date Object
    var date = new Date(createdAt * 1000);
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var lastMessageTime = minutes.substr(-2) + ':' + seconds.substr(-2);
    return (
      <TouchableOpacity onPress={() => this.props.onPress({ item: { chat, user } })}>
        <ListItem
          title={title || "Title"}
          titleStyle={{ fontWeight: 'bold', fontSize: 17 }}
          subtitle={subtitle || "SubTitle"}
          leftAvatar={{ source: { uri: user.photoURL } }}
          rightTitle={lastMessageTime}
          rightTitleStyle={{ position: 'absolute', bottom: 5 }}
          badge={{
            value: 1,
            textStyle: { color: 'white' },
            badgeStyle: { position: 'absolute', left: -50, top: 0 }
          }}

          containerStyle={{ borderBottomWidth: 0.5, borderBottomEndRadius: 50, borderBottomStartRadius: 100 }} />
      </TouchableOpacity>
    );
  }
}