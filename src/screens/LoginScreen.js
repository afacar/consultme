import React, { Component } from 'react';
import { View, Text } from 'react-native';


import {LoginPhoneNumberComponent} from '../components/common';
class LoginScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Kayıt ol`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    state = {
        phoneNumber: '',
        phoneNumberEntered: false
    }

    renderLoginComponent = () => {
        if ( !this.state.phoneNumberEntered){
            return <LoginPhoneNumberComponent/>
        }
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                {this.renderLoginComponent()}
                {/* <Text>
                    Consult Me telefon numaranızı doğrulamanız için size kod gönderecektir. Lütfen, numaranızı girin.
                </Text>
                <CardItem>
                    <Input
                        key='phone_number'
                        label='Numaranızı girin'
                        placeholder='+90 535 ...'
                        onChangeText={value => this.setState({ phoneNumber: value })}
                        value={this.state.phoneNumber}
                    />
                </CardItem> */}
            </View>
        )
    }
}

export default LoginScreen;