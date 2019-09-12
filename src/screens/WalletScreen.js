import React, { Component } from 'react';
import { View, Text } from 'react-native';

class WalletScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Cüzdanım`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    componentDidMount() {
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>WalletScreen</Text>
            </View>
        )
    }
}

export default WalletScreen;