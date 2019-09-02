import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardItem } from './CardItem';
import { Input, Button } from 'react-native-elements';
import { LoginIcon } from '../common/Icons';

export class LoginPhoneNumberComponent extends Component {
    render() {
        return (
            <View style={{ margin: 10 }}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Consult Me telefon numaranızı doğrulamanız için size kod gönderecektir. Lütfen, numaranızı girin.
                </Text>
                <View style={{ flexDirection: 'column' }} />
                <Input
                    style={{ flex: 2 }}
                    key='phone_number'
                    label='Numaranızı girin'
                    placeholder='+90 535 ...'
                    value={this.props.phoneNumber || ''}
                />
                <Button
                    style={{ flex: 1 }}
                    type='clear'
                    icon={<LoginIcon size={24} />}
                />
                <Text style={{ textAlign: 'justify', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}