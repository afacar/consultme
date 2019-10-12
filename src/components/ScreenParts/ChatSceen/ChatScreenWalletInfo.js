import React, { Component } from 'react';
import { View, Text } from 'react-native';
import colors from '../../../Constants/Colors';

class ChatScreenWalletInfo extends Component {

    render() {
        const { wallet, remaining } = this.props;
        return (
            <View style={{ width: '100%', backgroundColor: colors.LIGHT_GRAY_BACKGROUND_COLOR, flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-start', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Kalan Kredi</Text>
                    <Text>{wallet ? wallet : 0} CC</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'flex-end', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Kalan Kullanım</Text>
                    <Text>{remaining} Karakter</Text>
                </View>
            </View>
        )
    }
}

export default ChatScreenWalletInfo;