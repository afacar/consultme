import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SettingsScreen extends Component {


    componentDidMount() {
        console.log("SplashScreen mounted");
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text>SettingsScreen</Text>
            </View>
        )
    }
}

export default SettingsScreen;