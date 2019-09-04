import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CardItem } from './CardItem';
import { Input, Button, Avatar, Card, Icon } from 'react-native-elements';
import { LoginIcon, VerifyIcon, NextIcon } from '../common/Icons';

export class LoginPhoneNumberComponent extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems:'center', flexDirection:'column', margin:5}}>
                <Card>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Consult Me telefon numaranızı doğrulamanız için size kod gönderecektir. Lütfen, numaranızı girin.
                </Text>
                </Card>
                <View style={styles.container }>
                    <Input
                        style={{flex: 1}}
                        keyboardType = 'phone-pad'
                        key='phone_number'
                        label='Numaranızı girin'
                        placeholder='+90 535 ...'
                        onChangeText={(value) => { this.props.onNumberChanged(value) }}
                        value={this.props.phoneNumber || ''}
                    />
                    <Button
                        style={{ flex: 1}}
                        disabled={this.props.disabled || false}
                        type='clear'
                        onPress={() => { this.props.onNextPressed() }}
                        icon={<NextIcon size={32} disabled={this.props.disabled} />}
                        />
                   </View>             
                <Text style={{ textAlign:'left', fontSize: 12, color: 'grey', marginBottom: 5 }}>
                    Carrier SMS charges may apply.
                </Text>
            </View>
        )
    }
}

export class PhoneNumberVerificationComponent extends Component {
    render() {
        return (
            <View style={{flex: 1, alignItems:'center', flexDirection:'column', margin:5}}>
                 <Card>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Telefonunuza gönderilen kodu girin.
                </Text>
                </Card>
                <View style={styles.container }>
                    <Input
                        style={{ flex: 1 }}
                        key='phone_number'
                        keyboardType = 'numeric'
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
            <View style={{ margin: 10, alignItems: 'center', flex: 1}}>
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

export class ProfileEmptyPictureComponent extends Component {

    render() {
        return (
            <View style={{flex: 1, alignItems:'center', flexDirection:'column', margin:5}}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Lütfen profil resminizi seçin.
                </Text>
                <View style={{margin:10, alignItems:'center', flexDirection:'column' }} >
                <Avatar
                    size="xlarge"
                    onPress={() => { this.props.avatarPressed() }}
                    rounded={true}
                    icon={{ name: 'account', type: 'material-community' }}
                    showEditButton = {true}
                />
                 <View style={styles.container }>
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
                    disabled={this.props.disabled || false}
                    onPress={() => { this.props.onNextPressed() }}
                    icon={<NextIcon size={24} disabled={this.props.disabled} />}
                />
                </View>
                  </View>
            </View>
        );
    }
}

export class ProfilePictureChosenComponent extends Component {

    render() {
        return (
            <View style={{flex: 1, alignItems:'center', flexDirection:'column', margin:5}}>
                <Text style={{ textAlign: 'left', fontSize: 18, color: 'black', marginBottom: 5 }}>
                    Lütfen profil resminizi seçin.
                </Text>
                <View style={{margin:10, alignItems:'center', flexDirection:'column' }} >
                <Avatar
                    size="xlarge"
                    onPress={() => { this.props.avatarPressed() }}
                    rounded={true}
                    source={{ uri: this.props.uri }}
                />
                 <View style={styles.container }>
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
                    disabled={this.props.disabled || false}
                    onPress={() => { this.props.onNextPressed() }}
                    icon={<VerifyIcon size={24} disabled={this.props.disabled} />}
                />
                </View>
                  </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
        container: {
          margin: 30, 
          alignItems:'center', 
          flexDirection:'row'
        },
});