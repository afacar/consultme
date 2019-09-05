import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Profil ayarlarım`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    componentDidMount() {
        console.log("ProfileScreen mounted");
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text>ProfileScreen</Text>
            </View>
        )
    }
}

export default ProfileScreen;