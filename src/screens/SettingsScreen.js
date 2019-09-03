import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Ayarlar`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    componentDidMount() {
        console.log("SettingsScreen mounted");
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>SettingsScreen</Text>
            </View>
        )
    }
}

export default SettingsScreen;