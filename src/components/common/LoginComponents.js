import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardItem } from './CardItem';
import { Input, Button, Avatar } from 'react-native-elements';
import { LoginIcon } from '../common/Icons';

export class LoginPhoneNumberComponent extends Component {
    render() {
        return (
            <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Consult Me telefon numaranızı doğrulamanız için size kod gönderecektir. Lütfen, numaranızı girin.
                </Text>
                <View style={{ flexDirection: 'column' }} >
                    <Input
                        style={{ flex: 2 }}
                        key='phone_number'
                        label='Numaranızı girin'
                        placeholder='+90 535 ...'
                        onChangeText={(value) => { this.props.onNumberChanged(value) }}
                        value={this.props.phoneNumber || ''}
                    />
                    <Button
                        style={{ flex: 1 }}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<LoginIcon size={24} />}
                    />
                </View>
                <Text style={{ textAlign: 'justify', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}

export class PhoneNumberVerificationComponent extends Component {
    render() {
        return (
            <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Telefonunuza gönderilen kodu girin.
                </Text>
                <View style={{ flexDirection: 'column' }} >
                    <Input
                        style={{ flex: 2 }}
                        key='phone_number'
                        label='Kodu girin'
                        placeholder='123456'
                        onChangeText={(value) => { this.props.onVerificationCodeChanged(value) }}
                        value={this.props.verificationCode || ''}
                    />
                    <Button
                        style={{ flex: 1 }}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<LoginIcon size={24} />}
                    />
                </View>
                <Text style={{ textAlign: 'justify', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}

export class NameComponent extends Component {
    render() {
        return (
            <View style={{ margin: 10, alignItems: 'center' }}>
                <View style={{ flexDirection: 'column' }} >
                    <Input
                        style={{ flex: 2 }}
                        key='name'
                        label='İsminizi girin'
                        placeholder='İsim Soyisim'
                        value={this.props.name || ''}
                        onChangeText={(value) => { this.props.onNameChanged(value) }}
                    />
                    <Button
                        style={{ flex: 1 }}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<LoginIcon size={24} />}
                    />
                </View>
                <Text style={{ textAlign: 'justify', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}

export class ProfileEmptyPictureComponent extends Component {

    render() {
        return (
            <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Lütfen profil resminizi seçin.
                </Text>
                <Avatar
                    size="xlarge"
                    onPress={() => { this.props.avatarPressed() }}
                    rounded={true}
                    icon={{ name: 'account', type: 'material-community' }}
                />
                <Button
                    style={{ flex: 1 }}
                    type='clear'
                    onPress={() => { this.props.onNextPressed() }}
                    icon={<LoginIcon size={24} />}
                />
            </View>
        );
    }
}

export class ProfilePictureChosenComponent extends Component {

    render() {
        return (
            <View style={{ margin: 10, alignItems: 'center' }}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Lütfen profil resminizi seçin.
                </Text>
                <Avatar
                    size="xlarge"
                    onPress={() => { this.props.avatarPressed() }}
                    rounded={true}
                    source={{ uri: this.props.uri }}
                />
                <Button
                    style={{ flex: 1 }}
                    type='clear'
                    onPress={() => { this.props.onNextPressed() }}
                    icon={<LoginIcon size={24} />}
                />
            </View>
        );
    }
}