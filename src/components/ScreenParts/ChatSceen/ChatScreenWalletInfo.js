import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../../Constants/Colors';
import { Button } from 'react-native-elements';

class ChatScreenWalletInfo extends Component {

    render() {
        var { user, remaining, consultationType } = this.props;
        console.log("User in CSWI", user)
        const wallet = user.wallet
        if (remaining < 0)
            remaining = 0;
        return (
            <View style={{ width: '100%', backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR, flexDirection: 'row', marginVertical: 5, marginTop: 55 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Kalan Kredi</Text>
                    <Text>{wallet} CC</Text>
                </View>

                {
                    consultationType === 'session' && (
                        <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                            <Text>Kalan Kullanım</Text>
                            <Text>{remaining} Karakter</Text>
                        </View>
                    )
                }

                {
                    this.props.consultationType !== 'subscription' && (
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
                    this.props.consultationType === 'subscription' && this.props.status === 'expired' && (
                        <View style={{ flex: 1 }}>
                            <Button
                                type='clear'
                                title='Aboneliğe devam et'
                                onPress={() => { this.props.startSubscription() }}
                            />
                        </View>
                    )
                }
                {
                    this.props.consultationType === 'subscription' && this.props.status === 'ongoing' && (
                        <View style={{ flex: 1 }}>
                            <Button
                                type='clear'
                                title='Aboneliğimi iptal et'
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