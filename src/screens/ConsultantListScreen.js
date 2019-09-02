import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import {LoginIcon} from '../components/common/Icons';
import { Button } from 'react-native-elements';

class ConsultantListScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Danışman listesi`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },

        headerRight: (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                        <Button 
                        onPress={() => navigation.navigate('LoginScreen')}
                        type='clear'
                        icon={<LoginIcon size={24} /> }
                        />
                    </View>
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