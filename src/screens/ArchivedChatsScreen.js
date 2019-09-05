import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ArchivedChatsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Arşiv mesajlar`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    componentDidMount() {
        console.log("ArchivedChatsScreen mounted");
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>ArchivedChatsScreen</Text>
            </View>
        )
    }
}

export default ArchivedChatsScreen;