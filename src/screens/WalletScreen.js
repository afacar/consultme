import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { WalletForm } from '../components/Forms/WalletForm';

class WalletScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Cüzdanım`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    componentDidMount() {
        console.log("WalletScreen mounted");
    }

    render() {
        return (
            <ScrollView>
                <WalletForm/>
            </ScrollView>
        )
    }
}

export default WalletScreen;