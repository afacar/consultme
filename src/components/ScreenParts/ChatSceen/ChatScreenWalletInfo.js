import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../../Constants/Colors';
import { Button } from 'react-native-elements';

class ChatScreenWalletInfo extends Component {

    render() {
        const { wallet, remaining } = this.props;
        return (
            <View style={{ width: '100%', backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR, flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Kalan Kredi</Text>
                    <Text>{wallet} CC</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Kalan Kullanım</Text>
                    <Text>{remaining} Karakter</Text>
                </View>
                {
                    this.props.consultationType === 'session' && (
                        <View style={{ flex: 1 }}>
                            <Button
                                type='clear'
                                title='Abone ol'
                                onPress={() => { this.props.startSubscription() }}
                            />
                        </View>
                    )
                }
                {
                    this.props.consultationType === 'subscription' && (
                        <View style={{ flex: 1 }}>
                            <Button
                                type='clear'
                                title='Abone ol'
                                onPress={() => { this.props.cancelSubscription() }}
                            />
                        </View>
                    )
                }
            </View>
        )
    }
}

export default ChatScreenWalletInfo;