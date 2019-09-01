import React, { Component } from 'react';
import { View, Text } from 'react-native';

class ConsulterListScreen extends Component {
    componentDidMount() {
        console.log("ConsulterListScreen mounted");
    }
    render() {
        return (
            <View>
                <Text>ConsulterListScreen</Text>
            </View>
        )
    }
}

export default ConsulterListScreen;