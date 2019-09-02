import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import LoginIcon from '../components/common/Icons';

class ConsultantListScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Consultants`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },

        headerRight: (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                        <LoginIcon size={24}/>
                    </View>
                </TouchableOpacity>
            </View>
        )
    });

    componentDidMount() {
        console.log("ConsultantListScreen mounted");
    }
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>List of all Consultants will be here</Text>
            </View>
        )
    }
}

export default ConsultantListScreen;