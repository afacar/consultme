import React, { Component } from 'react';
import { View, Text } from 'react-native';

class SplashScreen extends Component {


    componentDidMount() {
        console.log("SplashScreen mounted");
        setTimeout(() => {
            this.props.navigation.navigate('HomeScreen');
        }, 2000);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Text>SplashScreen</Text>
            </View>
        )
    }
}

export default SplashScreen;