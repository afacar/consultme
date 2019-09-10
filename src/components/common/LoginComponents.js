import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { CardItem } from './CardItem';
import { Input, Button, Avatar, Card, Icon } from 'react-native-elements';
import { LoginIcon, VerifyIcon, NextIcon } from '../common/Icons';
import { Switch } from 'react-native-gesture-handler';
import SwitchExample from './Switch.js'
import strings from '../../Constants/Strings';

export class LoginPhoneNumberComponent extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', margin: 5 }}>
                <Card>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                        Consult Me telefon numaranızı doğrulamanız için size kod gönderecektir. Lütfen, numaranızı girin.
                </Text>
                </Card>
                <View style={styles.container}>
                    <Input
                        style={{ flex: 1 }}
                        keyboardType='phone-pad'
                        key='phone_number'
                        label='Numaranızı girin'
                        placeholder='+90 535 ...'
                        onChangeText={(value) => { this.props.onNumberChanged(value) }}
                        value={this.props.phoneNumber || ''}
                    />
                    <Button
                        style={{ flex: 1 }}
                        disabled={this.props.disabled || false}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<NextIcon size={32} disabled={this.props.disabled} />}
                    />
                </View>
                <Text style={{ textAlign: 'left', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}

export class PhoneNumberVerificationComponent extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', margin: 5 }}>
                <Card>
                    <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                        Telefonunuza gönderilen kodu girin.
                </Text>
                </Card>
                <View style={styles.container}>
                    <Input
                        style={{ flex: 1 }}
                        key='phone_number'
                        keyboardType='numeric'
                        label='Kodu girin'
                        autoFocus={true}
                        placeholder='123456'
                        onChangeText={(value) => { this.props.onVerificationCodeChanged(value) }}
                        value={this.props.verificationCode || ''}
                    />
                    <Button
                        disabled={this.props.disabled || false}
                        style={{ flex: 1 }}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<VerifyIcon size={32} disabled={this.props.disabled} />}
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
            <View style={{ margin: 10, alignItems: 'center', flex: 1 }}>
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
                        disabled={this.props.disabled || false}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<NextIcon size={24} disabled={this.props.disabled} />}
                    />
                </View>
                <Text style={{ textAlign: 'justify', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}


export class ProfilePictureComponent extends Component {

    render() {
        return (
            <View style={{ margin: 10, alignItems: 'center', flexDirection: 'column', flex: 1 }}>
                <Text style={{ fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Lütfen profil resminizi seçin.
            </Text>
                <View style={{ margin: 10, alignItems: 'center' }} >
                    <Avatar
                        size="xlarge"
                        onPress={() => { this.props.avatarPressed() }}
                        rounded={true}
                        source={{ uri: this.props.uri || strings.DEFAULT_PROFILE_PIC }}
                        showEditButton={true}
                    />
                </View>
                <View style={styles.container}>
                    <Input
                        style={{ flex: 1 }}
                        key='name'
                        label='İsminizi girin'
                        placeholder='İsim Soyisim'
                        value={this.props.name || ''}
                        onChangeText={(value) => { this.props.onNameChanged(value) }}
                    />
                    <Button
                        style={{ flex: 1 }}
                        type='clear'
                        disabled={this.props.disabled || false}
                        onPress={() => {
                            this.props.onNextPressed()
                        }}
                        icon={<NextIcon size={24} disabled={this.props.disabled} />}
                    />

                </View>
                <View style={{ margin: 18, alignItems: 'center', flexDirection: 'row' }} >
                    <Text style={{ textAlign: 'center', fontSize: 18, color: 'green' }}>Danışman olmak istiyorum</Text>
                    <SwitchExample
                        toggleSwitch1={this.props.toggleSwitch1}
                        switch1Value={this.props.switch1Value} />
                </View>
                <Text style={{ textAlign: 'center', fontSize: 12, color: 'grey' }}>Eğer daha önce danışmanlık kayıdı yaptırdıysanız devam edebilirsiniz. </Text>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        margin: 30,
        alignItems: 'center',
        flexDirection: 'row'
    },
});